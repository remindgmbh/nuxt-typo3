import { Filter, List } from '.'

export interface FilterableList<T> extends List<T> {
    filters: Filter[]
}
