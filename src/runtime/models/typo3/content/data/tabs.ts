import type { Header } from '.'
import type { Item } from '..'

export interface Tabs extends Header {
    items: Item[]
}
