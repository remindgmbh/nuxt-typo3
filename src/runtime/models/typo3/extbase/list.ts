import type { Pagination, Property } from './index'

export interface List<T> {
    count: number
    countWithoutLimit: number
    items: T[]
    pagination: Pagination
    properties: Property[]
}
