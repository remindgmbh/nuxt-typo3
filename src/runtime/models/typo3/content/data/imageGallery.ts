import type { Asset } from '../../index'
import type { Header } from './index'

export interface ImageGallery extends Header {
    images: Asset.Image[]
    settings: {
        type: 'scroll' | 'slide'
    }
}
