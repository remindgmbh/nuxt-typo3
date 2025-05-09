import type { Property } from './index'

export interface Detail<T> {
    item?: T
    properties: Property[]
    additionalData: any
}
