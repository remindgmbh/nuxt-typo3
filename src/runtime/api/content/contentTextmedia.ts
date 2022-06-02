import { Asset, ContentText } from '..'

export interface ContentTextmedia extends ContentText {
    assets: Asset[]
    assetPosition: 'right' | 'left'
    ratio: number
}
