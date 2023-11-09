import type { Item } from '..'
import type { Header } from '.'

export interface Accordion extends Header {
    items: Item[]
}
