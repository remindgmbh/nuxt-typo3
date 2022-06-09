import { ValidationType } from './validation'
import { Model } from '#nuxt-typo3'

export type FormElementType =
    | 'Text'
    | 'Textarea'
    | 'Password'
    | 'Email'
    | 'Telephone'
    | 'Url'
    | 'Number'
    | 'Date'
    | 'SingleSelect'
    | 'FileUpload'
    | 'Checkbox'
    | 'RadioButton'
    | 'GridRow'
    | 'MultiCheckbox'

export interface FormElement {
    identifier: string
    type: FormElementType
    label: string
    name: string
    properties?: {
        size?: number
        options?: { [key: string]: string }
        prependOptionLabel?: string
    }
    defaultValue?: any
    elements?: FormElement[]
    validators?: Array<{
        identifier: ValidationType
        options: { [key: string]: string }
    }>
}

type FormElementTypeMapping = {
    [Property in FormElementType]: Model.FormElementType
}

export const formElementTypeMapping: FormElementTypeMapping = {
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
    Telephone: 'tel',
    Text: 'text',
    Textarea: 'textarea',
    Url: 'url',
}
