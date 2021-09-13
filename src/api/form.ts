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
        page: {
            current: number
            nextPage: number
            page: number
        }
    }
    elements: FormElement[]
    i18n: any[]
    id: string
}
