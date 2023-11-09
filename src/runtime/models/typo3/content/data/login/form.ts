import type { FormElement } from './formElement'

export interface Form {
    title?: string
    action: string
    method: 'POST'
    elements: FormElement[]
}
