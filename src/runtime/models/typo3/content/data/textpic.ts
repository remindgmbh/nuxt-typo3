import type { Asset } from '../..'
import type { Text } from '.'

export interface Textpic extends Text {
    image: Asset.Image
    imagePosition: 'right' | 'left'
    ratio: number
}
