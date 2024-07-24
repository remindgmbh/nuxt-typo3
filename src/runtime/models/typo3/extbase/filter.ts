import type { FilterValue } from './index'

export interface Filter {
    name: string
    label: string
    prefix: string
    suffix: string
    values: FilterValue[]
    resetFilter: FilterValue
}
