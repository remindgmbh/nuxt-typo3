import { Asset } from '../..'
import { Text } from '.'

export interface TextAsset extends Text {
    assets: Asset[]
    assetPosition: 'right' | 'left'
    ratio: number
}
