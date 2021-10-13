import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../mixins/BaseCe'
import { Form, FormElement, Typolink } from '../../../../api'
import { SET_CONTENT } from '../../../../pages/Default'

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

// Map TYPO3 validation rules to vueformulate
const VALIDATIONS = {
    EmailAddress: 'email',
    NotEmpty: 'required',
    Number: 'number',
}

interface FormInput {
    id: string
    name: string
    type: any
    label: string
    placeholder: any
    options: any
    validation: string[]
}

export default BaseCe.extend({
    name: 'CeFormFormframework',
    props: {
        bodytext: {
            type: String,
            required: true,
            default: '',
        },
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
                result[this.getFormElementName(value)] =
                    value.defaultValue || null
                return result
            }, {})
        },
        formInputs(): FormInput[] {
            return this.form.elements.map((formElement) => ({
                id: formElement.identifier,
                name: this.getFormElementName(formElement),
                type: TYPES[formElement.type] || 'hidden',
                label: formElement.label,
                placeholder:
                    formElement.properties?.fluidAdditionalAttributes
                        ?.placeholder,
                options: formElement.properties.options,
                validation: (formElement.validators || []).map(
                    (validator) => VALIDATIONS[validator.identifier]
                ),
            }))
        },
    },
    data() {
        return {
            files: {} as { [id: string]: File },
        }
    },
    methods: {
        getFormElementName(formElement: FormElement): string {
            return `tx_form_formframework[${this.form.id}][${formElement.identifier}]`
        },
        uploadFile(file: File, formInput: FormInput): void {
            this.files[formInput.name] = file
        },
        async submit(data: { [key: string]: any }): Promise<void> {
            const formData = Object.keys(data).reduce((result, key) => {
                const value = this.files[key] || data[key] || ''
                result.set(key, value)
                return result
            }, new FormData())

            formData.set('responseElementId', this.id.toString())

            this.$axios.setBaseURL(this.$typo3.options.api.baseURL)

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
                return createElement('FormulateInput', {
                    key: formInput.id,
                    props: {
                        disabled: isLoading,
                        ...formInput,
                        uploader: (file: File) =>
                            this.uploadFile(file, formInput),
                    },
                    class: {
                        required: formInput.validation.includes(
                            VALIDATIONS.NotEmpty
                        ),
                    },
                })
            })
        }

        const submitButton = (isLoading: boolean) => {
            return createElement(
                'FormulateInput',
                {
                    props: { type: 'submit', disabled: isLoading },
                },
                [isLoading ? this.form.i18n.loading : this.form.i18n.submit]
            )
        }

        return createElement('div', { class: 'ce-form' }, [
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
