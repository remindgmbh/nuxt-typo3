import { FilterValue } from '.'

export interface Filter {
    name: string
    label: string
    prefix: string
    suffix: string
    values: FilterValue[]
    allValues: {
        link: string
        label: string
    }
}
