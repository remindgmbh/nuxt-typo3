import type { Asset } from '../..'
import type { Text } from '.'

export interface Textmedia extends Text {
    media: Asset.Base
    mediaPosition: 'right' | 'left'
    ratio: number
}
