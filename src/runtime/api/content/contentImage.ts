import { Asset, Content } from '#nuxt-typo3/api'

export interface ContentImage extends Content {
    images: Asset[]
}
