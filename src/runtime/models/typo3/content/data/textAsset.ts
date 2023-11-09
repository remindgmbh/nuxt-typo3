import type { Asset } from '../..'
import type { Text } from '.'

export interface TextAsset extends Text {
    assets: Asset[]
    assetPosition: 'right' | 'left'
    ratio: number
}
