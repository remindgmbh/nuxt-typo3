export interface Property {
    name: string
    label: string
    prefix: string
    suffix: string
    valueOverrides: { [key: string]: any }
}
