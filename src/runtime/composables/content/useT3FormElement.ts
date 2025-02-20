import type { GenericValidateFunction, RuleExpression } from 'vee-validate'
import { type Schema, array, boolean, date, mixed, number, string } from 'yup'
import { type T3Model, useT3YupUtil } from '#imports'
import { computed } from 'vue'
import { filesize } from 'filesize'
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
                                getErrorMessage('validation.stringLength.min', {
                                    label,
                                    min,
                                }),
                            )
                            .max(
                                max,
                                getErrorMessage('validation.stringLength.max', {
                                    label,
                                    max,
                                }),
                            )

                        break
                    }
                    case 'EmailAddress':
                        schema = string().email(
                            getErrorMessage('validation.emailAddress', {
                                label,
                            }),
                        )
                        break

                    case 'NotEmpty': {
                        const msg = getErrorMessage('validation.notEmpty', {
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
                            case 'FileUpload':
                                schema = mixed().required(msg)
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
                            getErrorMessage('validation.float', {
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
                                getErrorMessage('validation.numberRange.min', {
                                    label,
                                    min,
                                }),
                            )
                            .max(
                                max,
                                getErrorMessage('validation.numberRange.max', {
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
                            getErrorMessage('validation.regularExpression', {
                                label,
                            }),
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
                                getErrorMessage('validation.dateRange.min', {
                                    label,
                                    min,
                                }),
                            )
                        }

                        if (max) {
                            dateSchema = dateSchema.max(
                                max,
                                getErrorMessage('validation.dateRange.max', {
                                    label,
                                    max,
                                }),
                            )
                        }

                        schema = dateSchema
                        break
                    }
                    case 'Count': {
                        const min = Number.parseInt(
                            validator.options?.minimum ?? '',
                        )
                        const max = Number.parseInt(
                            validator.options?.maximum ?? '',
                        )

                        schema = array()
                            .min(
                                min,
                                getErrorMessage('validation.count.min', {
                                    label,
                                    min,
                                }),
                            )
                            .max(
                                max,
                                getErrorMessage('validation.count.max', {
                                    label,
                                    max,
                                }),
                            )

                        break
                    }
                    case 'FileSize': {
                        const min = Number.parseInt(
                            validator.options?.minimum ?? '',
                        )
                        const max = Number.parseInt(
                            validator.options?.maximum ?? '',
                        )

                        schema = mixed<File | File[]>().test((value, ctx) => {
                            if (value) {
                                const files = Array.isArray(value)
                                    ? value
                                    : [value]

                                if (files.some((file) => file.size < min)) {
                                    return ctx.createError({
                                        message: getErrorMessage(
                                            'validation.fileSize.min',
                                            {
                                                label,
                                                min: filesize(min),
                                            },
                                        ),
                                    })
                                }

                                if (files.some((file) => file.size > max)) {
                                    return ctx.createError({
                                        message: getErrorMessage(
                                            'validation.fileSize.max',
                                            { label, max: filesize(max) },
                                        ),
                                    })
                                }
                            }

                            return true
                        })

                        break
                    }
                    case 'MimeType': {
                        const mimeTypes =
                            validator.options?.allowed ?? ([] as string[])

                        schema = mixed<File | File[]>().test((value, ctx) => {
                            if (value) {
                                const files = Array.isArray(value)
                                    ? value
                                    : [value]

                                if (
                                    files.some(
                                        (file) =>
                                            !mimeTypes.includes(file.type),
                                    )
                                ) {
                                    return ctx.createError({
                                        message: getErrorMessage(
                                            'validation.mimeType',
                                            {
                                                label,
                                                mimeType: mimeTypes.join(', '),
                                            },
                                        ),
                                    })
                                }
                            }

                            return true
                        })
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
