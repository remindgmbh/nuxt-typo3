import { Asset } from '..'
import { Text } from './data'

export interface Item extends Text {
    id: number
    pid: number
    title: string
    images: Asset[]
}
