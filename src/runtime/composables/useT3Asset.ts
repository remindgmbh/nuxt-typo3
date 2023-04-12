import { computed } from 'vue'
import * as T3Api from '../api'
import * as T3Model from '../model'

export function useT3Asset(
    asset: T3Api.Asset,
    assetAttrs: { [key: string]: any } = {}
) {
    const imageAttrs = computed<T3Model.Image>(() => ({
        src: asset.publicUrl,
        uid: asset.properties.fileReferenceUid,
        alt: asset.properties.alternative,
        height: asset.properties.dimensions.height,
        width: asset.properties.dimensions.width,
        title: asset.properties.title,
        description: asset.properties.description,
        loading: asset.properties.lazyLoading ? 'lazy' : undefined,
        ...assetAttrs,
    }))

    const type = computed<string>(() => {
        switch (asset.properties.type) {
            case 'video': {
                if (['youtube', 'vimeo'].includes(asset.properties.extension)) {
                    return 'video-embedded'
                }
                return 'video'
            }
            case 'audio':
                return 'audio'
            case 'image':
                return 'image'
            default:
                return 'default'
        }
    })

    return { imageAttrs, type }
}
