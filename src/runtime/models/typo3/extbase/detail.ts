export interface Detail<T> {
    item: T
    properties: Array<{
        name: string
        label: string
        prefix: string
        suffix: string
    }>
    additionalData: any
}
