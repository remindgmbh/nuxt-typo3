import type { Asset } from '..'
import type { Text } from './data'

export interface Item extends Text {
    id: number
    pid: number
    title: string
    images: Asset[]
    items: Item[]
}
