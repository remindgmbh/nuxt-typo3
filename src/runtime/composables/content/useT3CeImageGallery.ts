import { computed } from 'vue'
import { T3Api, T3Model, useT3Asset, useT3Config } from '#nuxt-typo3'

export function useT3CeImageGallery(content: T3Api.Content.ImageGallery) {
    const config = useT3Config().images.ceImageGallery
    const header = computed(() => content.header)
    const subheader = computed(() => content.subheader)
    const type = computed(() => content.settings.type)

    const images = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                loading: config.lazy ? 'lazy' : undefined,
            })
            return imageAttrs.value
        })
    )

    const previewImages = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config.previewHeight,
            })
            return imageAttrs.value
        })
    )

    const navigationImages = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config.navigationHeight,
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
