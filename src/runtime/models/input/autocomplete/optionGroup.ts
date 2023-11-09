import type { Option } from '.'

export interface OptionGroup {
    label?: string
    name: string
    options: Option[]
}
