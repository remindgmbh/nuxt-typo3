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
    | 'Count'
    | 'FileSize'

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
    customErrorMessage?: string
    options?: { [key: string]: string }
}

export interface Properties {
    elementDescription?: string
    options?: { [key: string]: string }
    placeholder?: string
    prependOptionLabel?: string
    size?: string
    step?: string
    text?: string
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
