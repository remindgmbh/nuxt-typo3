import { Asset } from '../..'
import { Header } from '.'

export interface ImageGallery extends Header {
    images: Asset[]
    settings: {
        type: 'scroll' | 'slide'
    }
}
