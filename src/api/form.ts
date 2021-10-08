export interface FormElement {
    defaultValue: string
    identifier: string
    label: string
    name: string
    properties: any
    type: string
    validators: Array<{
        identifier: string
    }>
}

export interface Form {
    api: {
        actionAfterSuccess: any
        errors: { [fieldName: string]: string } | null
        page: {
            current: number
            nextPage: number
            page: number
        }
        status: 'success' | 'failure' | null
    }
    elements: FormElement[]
    i18n: {
        loading: string
        success: string
        submit: string
    }
    id: string
}
