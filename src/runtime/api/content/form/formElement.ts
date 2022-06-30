import { ValidationType } from './validation'
import { Model } from '#nuxt-typo3'

export type FormElementType =
    | 'Checkbox'
    | 'Date'
    | 'Email'
    | 'FileUpload'
    | 'GridRow'
    | 'MultiCheckbox'
    | 'Number'
    | 'Password'
    | 'RadioButton'
    | 'SingleSelect'
    | 'StaticText'
    | 'Text'
    | 'Textarea'
    | 'Telephone'
    | 'Url'

export interface FormElement {
    identifier: string
    type: FormElementType
    label: string
    name: string
    properties?: {
        size?: number
        options?: { [key: string]: string }
        prependOptionLabel?: string
        text?: string
        fluidAdditionalAttributes?: {
            placeholder?: string
        }
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
    StaticText: 'static-text',
    Telephone: 'tel',
    Text: 'text',
    Textarea: 'textarea',
    Url: 'url',
}
