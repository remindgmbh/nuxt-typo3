import type { Property } from '.'

export interface Detail<T> {
    item: T
    properties: Property[]
    additionalData: any
}
