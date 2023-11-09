import type { Pagination, Property } from '.'

export interface List<T> {
    count: number
    countWithoutLimit: number
    items: T[]
    pagination: Pagination
    properties: Property[]
}
