import { computed } from 'vue'
import { T3Api, T3Model } from '#nuxt-typo3'
import { useT3Asset } from '#nuxt-typo3/composables/useT3Asset'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'

export function useT3CeImageGallery(content: T3Api.Content.ImageGallery) {
    const config = useT3Config().contentElements.imageGallery
    const header = computed(() => content.header)
    const subheader = computed(() => content.subheader)
    const type = computed(() => content.settings.type)

    const images = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                fileExtension: config.imageFileExtension,
            })
            return imageAttrs.value
        })
    )

    const previewImages = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config.previewHeight,
                fileExtension: config.imageFileExtension,
            })
            return imageAttrs.value
        })
    )

    const navigationImages = computed<T3Model.Image[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config.navigationHeight,
                fileExtension: config.imageFileExtension,
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
