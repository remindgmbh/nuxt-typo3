import { Schema, string } from 'yup'

export type ValidationType = 'required' | 'password' | 'email'

export function getValidationScheme(identifier: ValidationType): Schema {
    switch (identifier) {
        case 'email':
            return string().email()
        case 'required':
            return string().required()
        case 'password':
            return string()
    }
}
