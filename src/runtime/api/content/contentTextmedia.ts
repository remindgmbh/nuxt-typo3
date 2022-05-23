import { Asset, ContentText } from '#nuxt-typo3/api'

export interface ContentTextmedia extends ContentText {
    assets: Asset[]
    assetPosition: 'right' | 'left'
    ratio: number
}
