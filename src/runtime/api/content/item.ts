import { Asset, ContentText } from '#nuxt-typo3/api'

export interface Item extends ContentText {
    id: number
    pid: number
    title: string
    images: Asset[]
}
