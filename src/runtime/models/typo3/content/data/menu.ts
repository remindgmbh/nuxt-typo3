import type { Asset, Breadcrumb } from '../..'
import type { Header } from '.'

export interface MenuItem extends Breadcrumb {
    children: MenuItem[]
    images: Asset[]
}

export interface Menu extends Header {
    menu: MenuItem[]
}
