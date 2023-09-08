import { FilterValue } from '.'

export interface Filter {
    name: string
    label: string
    values: FilterValue[]
    allValues: {
        link: string
        label: string
    }
}
