import type { Asset } from '../..'
import type { Header } from '.'

export interface ImageGallery extends Header {
    images: Asset.Image[]
    settings: {
        type: 'scroll' | 'slide'
    }
}
