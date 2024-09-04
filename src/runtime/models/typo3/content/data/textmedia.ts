import type { Asset } from '../../index'
import type { Text } from './index'

export interface Textmedia extends Text {
    media?: Asset.Base
    mediaPosition: 'right' | 'left'
    ratio: number
}
