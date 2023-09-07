import { FilterValue } from '.'

export interface Filter {
    name: string
    label: string
    values: FilterValue[]
    allValuesLink: string
}
