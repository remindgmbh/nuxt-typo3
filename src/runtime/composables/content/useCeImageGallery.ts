import { computed } from 'vue'
import { Api, Model, useAsset } from '#nuxt-typo3'

export function useCeImageGallery(content: Api.Content.ImageGallery) {
    const header = computed(() => content.header)
    const subheader = computed(() => content.subheader)
    const type = computed(() => content.settings.type)

    const images = computed<Model.Image[]>(() =>
        content.images.map((asset) => {
            const { image } = useAsset(asset)
            return image.value
        })
    )

    return {
        header,
        images,
        type,
        subheader,
    }
}
