import type { Filter, FilterValue, List } from '.'

export interface FilterableList<T> extends List<T> {
    filters: Filter[]
    resetFilters: FilterValue
}
