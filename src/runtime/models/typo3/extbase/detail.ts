export interface Detail<T> {
    item: T
    properties: Array<{
        value: string
        label: string
    }>
    additionalData: any
}
