import { computed } from 'vue'
import { Api, Model, useAsset, useConfig } from '#nuxt-typo3'

export function useCeImageGallery(content: Api.Content.ImageGallery) {
    const config = useConfig().images.ceGallery
    const header = computed(() => content.header)
    const subheader = computed(() => content.subheader)
    const type = computed(() => content.settings.type)

    const images = computed<Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useAsset(asset, {
                loading: config.lazy ? 'lazy' : undefined,
            })
            return imageAttrs.value
        })
    )

    const previewImages = computed<Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useAsset(asset, {
                height: config.previewHeight,
            })
            return imageAttrs.value
        })
    )

    const navigationImages = computed<Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useAsset(asset, {
                height: config.navigationHeight,
            })
            return imageAttrs.value
        })
    )

    return {
        header,
        images,
        navigationImages,
        previewImages,
        type,
        subheader,
    }
}
