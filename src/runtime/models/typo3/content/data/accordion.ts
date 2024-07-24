import type { Header } from './index'
import type { Item } from '../index'

export interface Accordion extends Header {
    items: Item[]
}
