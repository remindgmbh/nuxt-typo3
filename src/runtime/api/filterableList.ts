import { Pagination } from '.'

export interface FilterableList<T> {
    count: number
    items: T[]
    pagination: Pagination
    filters: Array<{
        name: string
        label: string
        values: Array<{
            value: string | number
            label: string
            link: string
            disabled: boolean
            active: boolean
        }>
    }>
}
