import type { Header } from './index'
import type { Item } from '../index'

export interface Tabs extends Header {
    items: Item[]
}
