import { computed } from 'vue'
import { defu } from 'defu'
import { Api, Model } from '#nuxt-typo3'

export function useAsset(
    asset: Api.Asset,
    assetAttrs: { [key: string]: any } = {}
) {
    const imageAttrs = computed<Model.Image>(() =>
        defu<any, Model.Image>(assetAttrs, {
            src: asset.publicUrl,
            uid: asset.properties.fileReferenceUid,
            alt: asset.properties.alternative,
            height: asset.properties.dimensions.height,
            width: asset.properties.dimensions.width,
            title: asset.properties.title,
            description: asset.properties.description,
        })
    )

    const type = computed(() => {
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
