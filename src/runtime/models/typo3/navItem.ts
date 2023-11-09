import type { Breadcrumb } from '.'

export interface NavItem extends Breadcrumb {
    overviewLabel?: string
    children: NavItem[]
}
