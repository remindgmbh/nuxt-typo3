import { Breadcrumb } from '.'

export interface NavItem extends Breadcrumb {
    children: NavItem[]
}
