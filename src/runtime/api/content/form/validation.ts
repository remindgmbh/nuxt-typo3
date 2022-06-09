import * as yup from 'yup'
import { FormElementType } from './formElement'

export type ValidationType =
    | 'NotEmpty'
    | 'StringLength'
    | 'EmailAddress'
    | 'Alphanumeric'

export function getValidationScheme(
    identifier: ValidationType,
    options: { [key: string]: string },
    formElementType: FormElementType
): yup.Schema {
    switch (identifier) {
        case 'StringLength': {
            const min = options.minimum ?? '0'
            const max = options.maximum ?? '0'
            return yup
                .string()
                .min(Number.parseInt(min))
                .max(Number.parseInt(max))
        }
        case 'EmailAddress':
            return yup.string().email()
        case 'NotEmpty': {
            switch (formElementType) {
                case 'Checkbox':
                    return yup.boolean().required().isTrue()
                case 'MultiCheckbox':
                    return yup.array().required().min(1)
                case 'RadioButton':
                case 'SingleSelect':
                    return yup.string().required()
                default:
                    return yup.string().required()
            }
        }
        // TODO
        case 'Alphanumeric':
            return yup.string()
    }
}
