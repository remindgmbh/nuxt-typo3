import { Schema, array, boolean, date, number, string } from 'yup'
import { FormElementType } from './formElement'
import { useYupUtil } from '#nuxt-typo3'

const { parseDateString, parseNumber } = useYupUtil()

export const REGEX_ALPHANUMERIC = /^(\w*)$/

export type ValidationType =
    | 'NotEmpty'
    | 'StringLength'
    | 'EmailAddress'
    | 'Alphanumeric'
    | 'Integer'
    | 'Float'
    | 'NumberRange'
    | 'RegularExpression'
    | 'DateRange'

export function getValidationScheme(
    identifier: ValidationType,
    options: { [key: string]: string },
    formElementType: FormElementType
): Schema {
    switch (identifier) {
        case 'StringLength': {
            const min = Number.parseInt(options.minimum) || 0
            const max = Number.parseInt(options.maximum) || 0
            return string().min(min).max(max)
        }
        case 'EmailAddress':
            return string().email()
        case 'NotEmpty': {
            switch (formElementType) {
                case 'Checkbox':
                    return boolean().required().isTrue()
                case 'MultiCheckbox':
                    return array().required().min(1)
                case 'RadioButton':
                case 'Number':
                    return number().required()
                case 'Date': {
                    return date()
                        .transform(parseDateString)
                        .required()
                        .default(undefined)
                }
                default:
                    return string().required()
            }
        }
        case 'Alphanumeric':
            return string().matches(REGEX_ALPHANUMERIC)
        case 'Integer': {
            switch (formElementType) {
                case 'Text':
                    return number().transform(parseNumber).integer()
                default:
                    return number().integer()
            }
        }
        case 'Float':
            switch (formElementType) {
                case 'Text':
                    return number().transform(parseNumber)
                default:
                    return number()
            }
        case 'NumberRange': {
            const min = Number.parseInt(options.minimum) || 0
            const max = Number.parseInt(options.maximum) || 0
            return number().min(min).max(max)
        }
        case 'RegularExpression': {
            const regex = new RegExp(options.regularExpression)
            return string().matches(regex)
        }
        case 'DateRange': {
            const min = options.minimum
            const max = options.maximum
            return date()
                .transform(parseDateString)
                .min(min)
                .max(max)
                .default(undefined)
        }
    }
}
