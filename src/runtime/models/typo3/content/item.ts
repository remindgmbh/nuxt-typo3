import type { Asset } from '../index'
import type { Text } from './data/index'

export interface Item extends Text {
    id: number
    pid: number
    title: string
    image: Asset.Image
    items: Item[]
}
