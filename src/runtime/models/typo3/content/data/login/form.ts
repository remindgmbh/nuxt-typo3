import type { FormElement } from './index'

export interface Form {
    title?: string
    action: string
    method: 'POST'
    elements: FormElement[]
}
