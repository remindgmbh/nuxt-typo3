import type { Asset } from '../../index'
import type { Text } from './index'

export interface Textpic extends Text {
    image?: Asset.Image
    imagePosition: 'right' | 'left'
    ratio: number
}
