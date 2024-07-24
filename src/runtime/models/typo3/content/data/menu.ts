import type { Breadcrumb } from '../../index'
import type { Header } from './index'

export interface MenuItem extends Breadcrumb {
    children: MenuItem[]
}

export interface Menu extends Header {
    menu: MenuItem[]
}
