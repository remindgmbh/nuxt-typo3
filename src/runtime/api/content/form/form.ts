import { FormElement } from './formElement'

export interface Form {
    id: string
    api: {
        status?: 'success' | 'failure'
        errors: any
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
        submit: string
        success: string
    }
    elements: FormElement[]
}
