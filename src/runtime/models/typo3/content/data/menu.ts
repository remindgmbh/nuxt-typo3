import type { Breadcrumb } from '../..'
import type { Header } from '.'

export interface MenuItem extends Breadcrumb {
    children: MenuItem[]
}

export interface Menu extends Header {
    menu: MenuItem[]
}
