import { Asset } from '../..'
import { Text } from '.'

export interface Textmedia extends Text {
    assets: Asset[]
    assetPosition: 'right' | 'left'
    ratio: number
}
