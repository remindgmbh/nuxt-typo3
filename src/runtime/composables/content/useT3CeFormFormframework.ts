import { array, boolean, date, number, string, Schema } from 'yup'
import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { GenericValidateFunction, RuleExpression } from 'vee-validate'
import { useLogger } from '#nuxt-logger'
import { T3Api, T3Model, useT3Api, useT3YupUtil } from '#nuxt-typo3'

const REGEX_ALPHANUMERIC = /^(\w*)$/

type FormElementTypeMapping = {
    [Property in T3Api.Content.Form.FormElementType]: T3Model.FormElementType
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

export function useT3CeFormFormframework(
    contentElement: T3Api.ContentElement<T3Api.Content.Formframework>
) {
    const logger = useLogger()
    const api = useT3Api()
    const { t } = useI18n()
    const { parseDateString, parseNumber, schemaToValidateFunction } =
        useT3YupUtil()

    const i18n = computed(() => contentElement.content.form.i18n)

    const submitLabel = computed(() => i18n.value.submit || t('form.submit'))

    const loadingLabel = computed(() => i18n.value.loading || t('form.loading'))

    const successLabel = computed(() => i18n.value.success || t('form.success'))

    const formElements = computed(() =>
        contentElement.content.form.elements.map(convert)
    )
    const loading = ref(false)

    function getValidation(
        formElement: T3Api.Content.Form.FormElement
    ): RuleExpression<any> {
        const result: GenericValidateFunction[] = []
        const label = formElement.label

        if (formElement.validators) {
            formElement.validators.forEach((validator) => {
                let schema: Schema | undefined

                switch (validator.identifier) {
                    case 'StringLength': {
                        const min =
                            Number.parseInt(validator.options.minimum) || 0
                        const max =
                            Number.parseInt(validator.options.maximum) || 0
                        schema = string()
                            .min(min, t('validation.min', { label, min }))
                            .max(max, t('validation.max', { label, max }))

                        break
                    }
                    case 'EmailAddress':
                        schema = string().email(
                            t('validation.email', { label })
                        )
                        break

                    case 'NotEmpty': {
                        const msg = t('validation.required', { label })
                        switch (formElement.type) {
                            case 'MultiCheckbox':
                                schema = array().required(msg).min(1, msg)
                                break
                            case 'Checkbox':
                                schema = boolean().required(msg).isTrue(msg)
                                break
                            case 'Number':
                                schema = number()
                                    .transform(parseNumber)
                                    .required(msg)
                                break
                            case 'Date':
                                schema = date()
                                    .transform(parseDateString)
                                    .required(msg)
                                    .default(undefined)
                                break
                            default: {
                                schema = string().required(msg)
                            }
                        }
                        break
                    }
                    case 'Alphanumeric':
                        schema = string().matches(
                            REGEX_ALPHANUMERIC,
                            t('validation.alphanumeric', { label })
                        )
                        break
                    case 'Integer': {
                        const msg = t('validation.integer', { label })
                        schema = number()
                            .transform(parseNumber)
                            .integer(msg)
                            .typeError(msg)

                        break
                    }
                    case 'Float':
                        schema = number()
                            .transform(parseNumber)
                            .typeError(t('validation.numeric', { label }))
                        break
                    case 'NumberRange': {
                        const min =
                            Number.parseInt(validator.options.minimum) || 0
                        const max =
                            Number.parseInt(validator.options.maximum) || 0
                        schema = number()
                            .transform(parseNumber)
                            .min(min)
                            .max(max)

                        break
                    }
                    case 'RegularExpression': {
                        const regex = new RegExp(
                            validator.options.regularExpression
                        )
                        schema = string().matches(
                            regex,
                            t('validation.regex', { label })
                        )
                        break
                    }
                    case 'DateRange': {
                        const min = validator.options.minimum
                        const max = validator.options.maximum

                        let dateSchema = date()
                            .transform(parseDateString)
                            .default(undefined)

                        if (min) {
                            dateSchema = dateSchema.min(
                                min,
                                t('validation.min', { label })
                            )
                        }

                        if (max) {
                            dateSchema = dateSchema.max(
                                max,
                                t('validation.max', { label })
                            )
                        }

                        schema = dateSchema
                        break
                    }
                }
                if (schema) {
                    result.push(schemaToValidateFunction(schema))
                }
            })
        }
        return result
    }

    function convert(
        formElement: T3Api.Content.Form.FormElement
    ): T3Model.FormElement {
        const f: T3Model.IFormElement = {
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

                return new T3Model.FormElementRow({ ...f, formElements })
            }
            case 'Checkbox':
                return new T3Model.FormElement({ ...f, defaultValue: false })
            case 'MultiCheckbox':
                return new T3Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                    defaultValue: formElement.defaultValue || [],
                })
            case 'RadioButton':
                return new T3Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'SingleSelect':
                return new T3Model.FormElementSelect({
                    ...f,
                    emptyLabel: formElement.properties?.prependOptionLabel,
                    options: formElement.properties?.options ?? {},
                })
            case 'Number':
                return new T3Model.FormElementNumber({
                    ...f,
                    step:
                        Number.parseInt(
                            formElement.properties?.fluidAdditionalAttributes
                                ?.step ?? ''
                        ) || 1,
                    min: Number.parseInt(
                        formElement.properties?.fluidAdditionalAttributes
                            ?.min ?? ''
                    ),
                    max: Number.parseInt(
                        formElement.properties?.fluidAdditionalAttributes
                            ?.max ?? ''
                    ),
                })
            case 'StaticText':
                return new T3Model.FormElementStaticText({
                    ...f,
                    text: formElement.properties?.text ?? '',
                })
            default:
                return new T3Model.FormElement(f)
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
                T3Api.ContentElement<T3Api.Content.Formframework>
            >(contentElement.content.link.href, { body })

            if (typeof result.content.form === 'string') {
                logger.error(result.content.form)
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

    return {
        formElements,
        loading,
        loadingLabel,
        submitLabel,
        successLabel,
        submit,
    }
}
