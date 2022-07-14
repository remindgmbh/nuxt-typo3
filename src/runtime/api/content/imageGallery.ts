import { Asset } from '..'
import { Base } from '.'

export interface ImageGallery extends Base {
    images: Asset[]
    settings: {
        type: 'scroll' | 'slide'
    }
}
