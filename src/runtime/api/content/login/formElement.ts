export type ValidationType = 'required' | 'password' | 'email'

export type FormElementType = 'text' | 'password' | 'submit'

export interface FormElement {
    type: FormElementType
    label?: string
    name: string
    value?: string
    validate?: { [Property in ValidationType]: 1 }
}
