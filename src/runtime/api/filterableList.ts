import { Filter, Pagination } from '.'

export interface FilterableList<T> {
    count: number
    items: T[]
    pagination: Pagination
    filters: Filter[]
}
