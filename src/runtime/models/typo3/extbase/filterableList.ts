import { Filter, Pagination } from '.'

export interface FilterableList<T> {
    count: number
    countWithoutLimit?: number
    items: T[]
    pagination: Pagination
    filters: Filter[]
}
