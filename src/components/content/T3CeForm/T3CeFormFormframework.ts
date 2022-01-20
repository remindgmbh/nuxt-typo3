import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import { Form, FormElement, Typolink } from '../../../api'
import { SET_CONTENT } from '../../../pages/Default'

// Map TYPO3 Input types to vueformulate
const TYPES = {
    Text: 'text',
    Textarea: 'textarea',
    Password: 'password',
    Email: 'email',
    Telephone: 'tel',
    Url: 'url',
    Number: 'number',
    Date: 'date',
    SingleSelect: 'select',
    FileUpload: 'file',
    Checkbox: 'checkbox',
    RadioButton: 'radio',
}

const STATIC_TEXT = 'StaticText'

// Map TYPO3 validation rules to vueformulate
const VALIDATIONS = {
    EmailAddress: 'email',
    NotEmpty: 'required',
    Number: 'number',
}

function getFormElementName(formId: string, formElement: FormElement): string {
    return `tx_form_formframework[${formId}][${formElement.identifier}]`
}

class FormInput {
    id: string
    name: string
    type: any
    label: string
    placeholder: any
    options: any
    validation: string[]
    accept?: string

    constructor(formId: string, formElement: FormElement) {
        this.id = formElement.identifier
        this.name = getFormElementName(formId, formElement)
        this.type = TYPES[formElement.type] || 'hidden'
        this.label = formElement.label
        this.placeholder =
            formElement.properties?.fluidAdditionalAttributes?.placeholder
        this.options = formElement.properties.options
        this.validation = (formElement.validators || []).map(
            (validator) => VALIDATIONS[validator.identifier]
        )
        if (formElement.properties.allowedMimeTypes) {
            const allowedMimeTypes = formElement.properties
                .allowedMimeTypes as string[]
            if (allowedMimeTypes.length > 0) {
                const joinedAllowedMimeTypes = allowedMimeTypes.join(',')
                this.validation.push(`mime:${joinedAllowedMimeTypes}`)
                this.accept = joinedAllowedMimeTypes
            }
        }
    }
}

class StaticText {
    label: string
    text: string

    constructor(formElement: FormElement) {
        this.label = formElement.label
        this.text = formElement.properties.text
    }
}

export default BaseCe.extend({
    name: 'T3CeFormFormframework',
    props: {
        form: {
            type: Object as PropType<Form>,
            required: true,
        },
        link: {
            type: Object as PropType<Typolink>,
            required: true,
        },
    },
    computed: {
        isSuccess(): boolean {
            return this.form.api?.status === 'success'
        },
        isFailure(): boolean {
            return this.form.api?.status === 'failure'
        },
        isSubmitted(): boolean {
            return this.isSuccess || this.isFailure
        },
        initialValues(): { [key: string]: any } {
            return this.form.elements.reduce((result, value) => {
                result[getFormElementName(this.form.id, value)] =
                    value.defaultValue || null
                return result
            }, {})
        },
        formInputs(): Array<FormInput | StaticText> {
            return this.form.elements.map((formElement) => {
                return formElement.type === STATIC_TEXT
                    ? new StaticText(formElement)
                    : new FormInput(this.form.id, formElement)
            })
        },
    },
    data() {
        return {
            files: {} as { [id: string]: File },
        }
    },
    methods: {
        uploadFile(file: File, formInput: FormInput): void {
            this.files[formInput.name] = file
        },
        async submit(data: { [key: string]: any }): Promise<void> {
            const formData = Object.keys(data).reduce((result, key) => {
                const value = this.files[key] || data[key] || ''
                result.set(key, value)
                return result
            }, new FormData())

            // https://docs.typo3.org/p/friendsoftypo3/headless/master/en-us/Configuration/Index.html
            // required so API returns only current content element instead of whole page
            formData.set('responseElementId', this.id.toString())

            const response = await this.$axios.post(this.link.url, formData)
            this.$nuxt.$emit(SET_CONTENT, {
                index: this.index,
                content: response.data,
            })
            this.$nextTick(() => {
                if (this.isSuccess) {
                    this.files = {}
                    this.$formulate.reset(this.form.id, this.initialValues)
                }
            })
        },
    },
    render(createElement: CreateElement): VNode {
        const formulateInputs = (isLoading: boolean) => {
            return this.formInputs.map((formInput) => {
                return formInput instanceof StaticText
                    ? createElement(
                          'div',
                          { class: 't3-ce-form__static-text' },
                          [
                              createElement('div', formInput.label),
                              createElement('div', formInput.text),
                          ]
                      )
                    : createElement('FormulateInput', {
                          key: formInput.id,
                          props: {
                              uploader: (file: File) =>
                                  this.uploadFile(file, formInput),
                          },
                          attrs: {
                              disabled: isLoading,
                              ...formInput,
                          },
                          class: {
                              required: formInput.validation.includes(
                                  VALIDATIONS.NotEmpty
                              ),
                          },
                          scopedSlots: {
                              errors: ({ visibleValidationErrors }) => {
                                  return this.$scopedSlots.errors?.({
                                      visibleValidationErrors,
                                  })
                              },
                          },
                      })
            })
        }

        const submitButton = (isLoading: boolean) => {
            return createElement('FormulateInput', {
                props: {
                    type: 'submit',
                    label: isLoading
                        ? this.form.i18n.loading
                        : this.form.i18n.submit,
                },
                class: {
                    'is-loading': isLoading,
                },
                attrs: {
                    disabled: isLoading,
                },
            })
        }

        return createElement('div', { class: 't3-ce-form' }, [
            createElement('ce-header', { props: this.$props }),
            createElement('FormulateForm', {
                props: { name: this.form.id, values: this.initialValues },
                on: { submit: this.submit },
                scopedSlots: {
                    default({ isLoading }: { isLoading: boolean }): VNode[] {
                        return [
                            ...formulateInputs(isLoading),
                            submitButton(isLoading),
                        ]
                    },
                },
            }),
        ])
    },
})
