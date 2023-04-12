import { FormElement } from './formElement'

export interface Form {
    title?: string
    action: string
    method: 'POST'
    elements: FormElement[]
}
