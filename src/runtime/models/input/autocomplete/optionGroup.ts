import type { Option } from './index'

export interface OptionGroup {
    label?: string
    name: string
    options: Option[]
}
