import { ValidationType } from './validation'
import { Model } from '#nuxt-typo3'

export type FormElementType = 'text' | 'password' | 'submit'

export interface FormElement {
    type: FormElementType
    label?: string
    name: string
    value?: string
    validate?: { [Property in ValidationType]: 1 }
}

type FormElementTypeMapping = {
    [Property in FormElementType]: Model.FormElementType
}

export const formElementTypeMapping: FormElementTypeMapping = {
    text: 'text',
    password: 'password',
    submit: 'submit',
}
