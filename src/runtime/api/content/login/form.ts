import { FormElement } from './formElement'

export interface Form {
    title?: string
    action: string
    method: 'POST'
    fields: {
        action: string
        pages: FormElement[]
    }
}
