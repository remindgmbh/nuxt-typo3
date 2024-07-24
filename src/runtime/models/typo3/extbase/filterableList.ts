import type { Filter, FilterValue, List } from './index'

export interface FilterableList<T> extends List<T> {
    filters: Filter[]
    resetFilters: FilterValue
}
