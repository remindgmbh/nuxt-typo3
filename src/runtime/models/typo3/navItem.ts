import type { Breadcrumb } from './index'

export interface NavItem extends Breadcrumb {
    overviewLabel?: string
    children?: NavItem[]
}
