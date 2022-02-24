import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import { Form, FormElement, Typolink } from '../../../api'
import { SET_CONTENT } from '../../../pages/Default'

// Map TYPO3 Input types to vueformulate
enum TYPES {
    Text = 'text',
    Textarea = 'textarea',
    Password = 'password',
    Email = 'email',
    Telephone = 'tel',
    Url = 'url',
    Number = 'number',
    Date = 'date',
    SingleSelect = 'select',
    FileUpload = 'file',
    Checkbox = 'checkbox',
    RadioButton = 'radio',
    GridRow = 'row',
}

const STATIC_TEXT = 'StaticText'

// Map TYPO3 validation rules to vueformulate
enum VALIDATIONS {
    EmailAddress = 'email',
    NotEmpty = 'required',
    Number = 'number',
}

function getFormElementName(formId: string, formElement: FormElement): string {
    return `tx_form_formframework[${formId}][${formElement.identifier}]`
}

class FormulateElement {
    id: string
    name: string
    type: any
    label: string
    placeholder: any
    options: any
    validation: string[]
    accept?: string
    // eslint-disable-next-line no-use-before-define
    elements?: FormulateElement[]
    size?: number

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
        if (formElement.elements) {
            this.elements = formElement.elements
                .filter((element) => element.type !== STATIC_TEXT)
                .map((element) => new FormulateElement(formId, element))
        }
        if (formElement.properties.size) {
            this.size = formElement.properties.size
        }
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
            return this.form.elements.reduce(
                (result, element) => this.getInitialValue(element, result),
                {}
            )
        },
        formulateElements(): Array<FormulateElement | StaticText> {
            return this.form.elements.map((element) => {
                return element.type === STATIC_TEXT
                    ? new StaticText(element)
                    : new FormulateElement(this.form.id, element)
            })
        },
    },
    data() {
        return {
            files: {} as { [id: string]: File },
        }
    },
    methods: {
        getInitialValue(
            element: FormElement,
            result: { [key: string]: any } = {}
        ): { [key: string]: any } {
            if (element.type === this.getTypesKeyByValue(TYPES.GridRow)) {
                if (element.elements) {
                    element.elements.forEach((childElement) => {
                        this.getInitialValue(childElement, result)
                    })
                }
            } else {
                result[getFormElementName(this.form.id, element)] =
                    element.defaultValue || null
            }
            return result
        },
        uploadFile(file: File, element: FormulateElement): void {
            this.files[element.name] = file
        },
        getTypesKeyByValue(type: TYPES) {
            return Object.keys(TYPES).find((key) => TYPES[key] === type)
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
                    const redirectUri =
                        this.form.api.actionAfterSuccess?.redirectUri
                    if (redirectUri) {
                        this.$router.push(redirectUri)
                    }

                    this.files = {}
                    this.$formulate.reset(this.form.id, this.initialValues)
                }
            })
        },
    },
    render(createElement: CreateElement): VNode {
        const renderElements = (isLoading: boolean) => {
            return createElement(
                'div',
                { class: 't3-ce-form__elements' },
                this.formulateElements.map((element) =>
                    element instanceof StaticText
                        ? renderStaticText(element)
                        : renderElement(element, isLoading)
                )
            )
        }

        const renderStaticText = (staticText: StaticText) => {
            return createElement('div', { class: 't3-ce-form__static-text' }, [
                createElement('div', staticText.label),
                createElement('div', staticText.text),
            ])
        }

        const renderRow = (
            elements: FormulateElement[] = [],
            isLoading: boolean
        ) => {
            return createElement(
                'div',
                {
                    class: 't3-ce-form__row',
                },
                elements.map((element) => {
                    return renderElement(element, isLoading, true)
                })
            )
        }

        const renderElement = (
            element: FormulateElement,
            isLoading: boolean,
            parentIsRow?: boolean
        ) => {
            if (element.type === TYPES.GridRow && element.elements) {
                return renderRow(element.elements, isLoading)
            }

            if (element.size && !parentIsRow) {
                return renderRow([element], isLoading)
            }

            return renderInput(element, isLoading)
        }

        const renderInput = (element: FormulateElement, isLoading: boolean) => {
            return createElement('FormulateInput', {
                key: element.id,
                props: {
                    uploader: (file: File) => this.uploadFile(file, element),
                },
                attrs: {
                    disabled: isLoading,
                    ...element,
                },
                class: [
                    't3-ce-form__element',
                    {
                        [`t3-ce-form__element--${element.size}`]: element.size,
                        required: element.validation.includes(
                            VALIDATIONS.NotEmpty
                        ),
                    },
                ],
                scopedSlots: {
                    errors: ({ visibleValidationErrors }) => {
                        return this.$scopedSlots.errors?.({
                            visibleValidationErrors,
                        })
                    },
                },
            })
        }

        const renderSubmitButton = (isLoading: boolean) => {
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
                            renderElements(isLoading),
                            renderSubmitButton(isLoading),
                        ]
                    },
                },
            }),
        ])
    },
})
