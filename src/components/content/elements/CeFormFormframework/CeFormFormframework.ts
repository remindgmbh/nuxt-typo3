import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../mixins/BaseCe'
import { Form, FormElement } from '../../../../api/form'
import { Typolink } from '../../../../api/typolink'

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
        initialValues(): { [key: string]: any } {
            return this.form.elements.reduce((result, value) => {
                result[this.getFormElementName(value)] =
                    value.defaultValue || null
                return result
            }, {})
        },
        formInputs(): {
            id: string
            name: string
            type: any
            label: string
            placeholder: any
            options: any
            validation: string[]
        }[] {
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
    methods: {
        getFormElementName(formElement: FormElement): string {
            return `tx_form_formframework[${this.form.id}][${formElement.identifier}]`
        },
        submit(data: { [key: string]: any }): Promise<void> {
            const formData = Object.keys(data).reduce((result, key) => {
                result.set(key, data[key] || '')
                return result
            }, new FormData())

            this.$axios.setBaseURL(this.$typo3.options.api.baseURL)

            return this.$axios.post(this.link.url, formData).then(() => {
                this.$formulate.reset(this.form.id, this.initialValues)
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
