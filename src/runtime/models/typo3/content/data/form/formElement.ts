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

export type FormElementType =
    | 'Checkbox'
    | 'Date'
    | 'Email'
    | 'FileUpload'
    | 'GridRow'
    | 'Hidden'
    | 'Honeypot'
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

export interface Validator {
    identifier: ValidationType
    options: { [key: string]: string }
}

export interface Properties {
    size?: number
    options?: { [key: string]: string }
    prependOptionLabel?: string
    text?: string
    fluidAdditionalAttributes?: {
        max?: string
        min?: string
        placeholder?: string
        step?: string
    }
}

export interface FormElement {
    identifier: string
    type: FormElementType
    label: string
    name: string
    properties?: Properties
    defaultValue?: any
    elements?: FormElement[]
    validators?: Validator[]
}
