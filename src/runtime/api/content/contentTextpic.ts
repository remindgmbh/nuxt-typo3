import { Asset, ContentText } from '#nuxt-typo3/api'

export interface ContentTextpic extends ContentText {
    images: Asset[]
    imagePosition: 'right' | 'left'
    ratio: number
}
