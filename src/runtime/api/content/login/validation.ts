import * as yup from 'yup'

export type ValidationType = 'required' | 'password' | 'email'

export function getValidationScheme(identifier: ValidationType): yup.Schema {
    switch (identifier) {
        case 'email':
            return yup.string().email()
        case 'required':
            return yup.string().required()
        case 'password':
            return yup.string()
    }
}
