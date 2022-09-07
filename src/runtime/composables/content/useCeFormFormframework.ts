import Joi from 'joi'
import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { GenericValidateFunction, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { Api, Model, useApi } from '#nuxt-typo3'

const REGEX_ALPHANUMERIC = /^(\w*)$/

type FormElementTypeMapping = {
    [Property in Api.Content.Form.FormElementType]: Model.FormElementType
}

const formElementTypeMapping: FormElementTypeMapping = {
    Checkbox: 'checkbox',
    Date: 'date',
    Email: 'email',
    FileUpload: 'file',
    GridRow: 'row',
    MultiCheckbox: 'checkbox-group',
    Number: 'number',
    Password: 'password',
    RadioButton: 'radio-group',
    SingleSelect: 'select',
    StaticText: 'static-text',
    Telephone: 'tel',
    Text: 'text',
    Textarea: 'textarea',
    Url: 'url',
}

export function useCeFormFormframework(
    contentElement: Api.ContentElement<Api.Content.Formframework>
) {
    const api = useApi()
    const { t } = useI18n()

    const formElements = computed(() =>
        contentElement.content.form.elements.map(convert)
    )
    const loading = ref(false)

    function getValidation(
        formElement: Api.Content.Form.FormElement
    ): RuleExpression<any> {
        const result: GenericValidateFunction[] = []
        const label = formElement.label

        formElement.validators?.forEach((validator) => {
            let schema: Joi.Schema | undefined

            switch (validator.identifier) {
                case 'StringLength': {
                    // minimum and maximum both are requried for StringLength validator
                    const min = Number.parseInt(validator.options.minimum) || 0
                    const max = Number.parseInt(validator.options.maximum) || 0
                    schema = Joi.string()
                        .min(min)
                        .max(max)
                        .error(([error]) => {
                            let message = ''
                            switch (error.code) {
                                case 'string.min':
                                case 'string.empty':
                                    message = t('validation.min', {
                                        label,
                                        min,
                                    })
                                    break
                                case 'string.max':
                                    message = t('validation.max', {
                                        label,
                                        max,
                                    })
                                    break
                            }
                            return new Error(message)
                        })
                    break
                }
                case 'EmailAddress':
                    schema = Joi.string()
                        .allow('')
                        .email({ tlds: { allow: false } })
                        .error(new Error(t('validation.email', { label })))
                    break
                case 'NotEmpty': {
                    switch (formElement.type) {
                        case 'Checkbox':
                            schema = Joi.boolean().required().invalid(false)
                            break
                        case 'MultiCheckbox':
                            schema = Joi.array().required().min(1)
                            break
                        case 'RadioButton':
                        case 'Number':
                            schema = Joi.number().required()
                            break
                        case 'Date': {
                            schema = Joi.date().required()
                            break
                        }
                        default:
                            schema = Joi.string().required()
                    }
                    if (schema) {
                        schema = schema.error(
                            new Error(t('validation.required', { label }))
                        )
                    }
                    break
                }
                case 'Alphanumeric':
                    schema = Joi.string()
                        .allow('')
                        .regex(REGEX_ALPHANUMERIC)
                        .error(
                            new Error(t('validation.alphanumeric', { label }))
                        )
                    break
                case 'Integer': {
                    schema = Joi.number()
                        .allow('')
                        .integer()
                        .error(new Error(t('validation.integer', { label })))
                    break
                }
                case 'Float':
                    schema = Joi.number()
                        .allow('')
                        .error(new Error(t('validation.numeric', { label })))
                    break
                case 'NumberRange': {
                    // minimum and maximum both are requried for NumberRange validator
                    const min = Number.parseInt(validator.options.minimum) || 0
                    const max = Number.parseInt(validator.options.maximum) || 0
                    schema = Joi.number()
                        .allow('')
                        .min(min)
                        .max(max)
                        .error(([error]) => {
                            let message = ''
                            switch (error.code) {
                                case 'number.min':
                                    message = t('validation.min', {
                                        label,
                                        min,
                                    })
                                    break
                                case 'number.max':
                                    message = t('validation.max', {
                                        label,
                                        max,
                                    })
                                    break
                            }
                            return new Error(message)
                        })
                    break
                }
                case 'RegularExpression': {
                    const regex = new RegExp(
                        validator.options.regularExpression
                    )
                    schema = Joi.string()
                        .regex(regex)
                        .error(
                            new Error(t('validation.regex', { label, regex }))
                        )
                    break
                }
                case 'DateRange': {
                    const min = validator.options.minimum
                    const max = validator.options.maximum
                    const dateSchema = Joi.date()
                        .empty('')
                        .error(([error]) => {
                            let message = ''
                            switch (error.code) {
                                case 'date.min':
                                    message = t('validation.min', {
                                        label,
                                        min,
                                    })
                                    break
                                case 'date.max':
                                    message = t('validation.max', {
                                        label,
                                        max,
                                    })
                                    break
                            }
                            return new Error(message)
                        })
                    if (min) {
                        schema = dateSchema.min(min)
                    }
                    if (max) {
                        schema = dateSchema.max(max)
                    }
                    break
                }
            }

            if (schema) {
                const validateFunction = (value: any) => {
                    const validateResult = schema?.validate(value)
                    return validateResult?.error?.message ?? true
                }
                result.push(validateFunction)
            }
        })

        return result
    }

    function convert(
        formElement: Api.Content.Form.FormElement
    ): Model.FormElement {
        const f: Model.IFormElement = {
            type: formElementTypeMapping[formElement.type] ?? 'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.defaultValue,
            size: formElement.properties?.size,
            required: !!formElement.validators?.find(
                (validator) => validator.identifier === 'NotEmpty'
            ),
            placeholder:
                formElement.properties?.fluidAdditionalAttributes?.placeholder,
            validation: getValidation(formElement),
        }

        switch (formElement.type) {
            case 'GridRow': {
                const formElements = formElement.elements
                    ? formElement.elements.map(convert)
                    : []

                return new Model.FormElementRow({ ...f, formElements })
            }
            case 'MultiCheckbox':
                f.defaultValue = formElement.defaultValue || []
                return new Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'RadioButton':
                return new Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'SingleSelect':
                return new Model.FormElementSelect({
                    ...f,
                    emptyLabel: formElement.properties?.prependOptionLabel,
                    options: formElement.properties?.options ?? {},
                })
            case 'StaticText':
                return new Model.FormElementStaticText({
                    ...f,
                    text: formElement.properties?.text ?? '',
                })
            default:
                return new Model.FormElement(f)
        }
    }

    async function submit(data: Record<string, any>) {
        loading.value = true
        const body = new FormData()
        body.set('responseElementId', contentElement.id.toString())

        Object.keys(data).forEach((key) => {
            body.set(key, data[key] ?? '')
        })

        try {
            const result = await api.post<
                Api.ContentElement<Api.Content.Formframework>
            >(contentElement.content.link.href, { body })

            if (typeof result.content.form === 'string') {
                console.error(result.content.form)
            } else if (
                result.content.form.api.status === 'success' &&
                result.content.form.api.actionAfterSuccess
            ) {
                await navigateTo({
                    path: result.content.form.api.actionAfterSuccess
                        .redirectUrl,
                })
            }
        } finally {
            loading.value = false
        }
    }

    return { formElements, loading, submit }
}
