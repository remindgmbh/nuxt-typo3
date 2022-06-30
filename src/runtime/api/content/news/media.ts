import { Image } from './image'
import { MediaProperties } from './mediaProperties'

export interface Media {
    type: 'application' | 'audio' | 'image' | 'video'
    properties: MediaProperties
    images?: {
        defaultImage: Image
        detailViewImage: Image
        listViewImage: Image
        listViewFeaturedImage: Image
        listViewVerticalImage: Image
    }
}
