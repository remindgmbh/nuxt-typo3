import { Asset } from '..'
import { Text } from '.'

export interface Item extends Text {
    id: number
    pid: number
    title: string
    images: Asset[]
}
