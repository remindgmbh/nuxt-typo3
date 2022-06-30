import { Asset } from '..'
import { Text } from '.'

export interface Textpic extends Text {
    images: Asset[]
    imagePosition: 'right' | 'left'
    ratio: number
}
