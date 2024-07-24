import { type GenericValidateFunction, type RuleExpression } from 'vee-validate'
import { type Schema, array, boolean, date, number, string } from 'yup'
import { type T3Model, useT3YupUtil } from '#imports'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const REGEX_ALPHANUMERIC = /^(\w*)$/

export function useT3FormElement(
    formElement: T3Model.Typo3.Content.Data.Form.FormElement,
) {
    const { t } = useI18n()
    const { parseDateString, parseNumber, schemaToValidateFunction } =
        useT3YupUtil()

    const options = computed<{ [key: string]: string }>(
        () => formElement.properties?.options ?? {},
    )

    const placeholder = computed<string | undefined>(
        () => formElement.properties?.placeholder,
    )

    const validation = computed<RuleExpression<any>>(() => getValidation())

    const required = computed<boolean>(
        () =>
            formElement.validators?.some(
                (validator) => validator.identifier === 'NotEmpty',
            ) ?? false,
    )

    function getValidation(): RuleExpression<any> {
        const result: GenericValidateFunction[] = []
        const { label } = formElement

        if (formElement.validators) {
            formElement.validators.forEach((validator) => {
                let schema: Schema | undefined

                function getErrorMessage(
                    key: string,
                    named: Record<string, unknown> = {},
                ): string {
                    return validator.customErrorMessage ?? t(key, named)
                }

                switch (validator.identifier) {
                    case 'StringLength': {
                        const min = Number.parseInt(
                            validator.options?.minimum ?? '',
                        )
                        const max = Number.parseInt(
                            validator.options?.maximum ?? '',
                        )
                        schema = string()
                            .min(
                                min,
                                getErrorMessage('validation.min', {
                                    label,
                                    min,
                                }),
                            )
                            .max(
                                max,
                                getErrorMessage('validation.max', {
                                    label,
                                    max,
                                }),
                            )

                        break
                    }
                    case 'EmailAddress':
                        schema = string().email(
                            getErrorMessage('validation.email', { label }),
                        )
                        break

                    case 'NotEmpty': {
                        const msg = getErrorMessage('validation.required', {
                            label,
                        })
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
                            getErrorMessage('validation.alphanumeric', {
                                label,
                            }),
                        )
                        break

                    case 'Integer': {
                        const msg = getErrorMessage('validation.integer', {
                            label,
                        })
                        schema = number()
                            .transform(parseNumber)
                            .integer(msg)
                            .typeError(msg)

                        break
                    }
                    case 'Float':
                        schema = number().transform(parseNumber).typeError(
                            getErrorMessage('validation.numeric', {
                                label,
                            }),
                        )
                        break
                    case 'NumberRange': {
                        const min = Number.parseInt(
                            validator.options?.minimum ?? '',
                        )
                        const max = Number.parseInt(
                            validator.options?.maximum ?? '',
                        )
                        schema = number()
                            .transform(parseNumber)
                            .min(
                                min,
                                getErrorMessage('validation.min', {
                                    label,
                                    min,
                                }),
                            )
                            .max(
                                max,
                                getErrorMessage('validation.max', {
                                    label,
                                    max,
                                }),
                            )

                        break
                    }
                    case 'RegularExpression': {
                        const regex = new RegExp(
                            validator.options?.regularExpression ?? '',
                        )
                        schema = string().matches(
                            regex,
                            getErrorMessage('validation.regex', { label }),
                        )
                        break
                    }
                    case 'DateRange': {
                        const min = validator.options?.minimum
                        const max = validator.options?.maximum

                        let dateSchema = date()
                            .transform(parseDateString)
                            .default(undefined)

                        if (min) {
                            dateSchema = dateSchema.min(
                                min,
                                getErrorMessage('validation.min', { label }),
                            )
                        }

                        if (max) {
                            dateSchema = dateSchema.max(
                                max,
                                getErrorMessage('validation.max', { label }),
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

    return {
        options,
        placeholder,
        required,
        validation,
    }
}
