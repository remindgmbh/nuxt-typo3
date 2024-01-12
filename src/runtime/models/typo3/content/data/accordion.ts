import type { Header } from '.'
import type { Item } from '..'

export interface Accordion extends Header {
    items: Item[]
}
