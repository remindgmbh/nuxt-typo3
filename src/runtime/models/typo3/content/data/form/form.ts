import type { FormElement } from './index'

export interface Form {
    id: string
    api: {
        status?: 'success' | 'failure'
        errors: { [key: string]: string }
        actionAfterSuccess?: {
            message?: string
            redirectUrl: string
            statusCode: number
        }
        page: {
            current: number
            nextPage?: number
            pages: number
        }
    }
    i18n: {
        loading: string
        required: string
        submit: string
        success: string
    }
    elements: FormElement[]
}
