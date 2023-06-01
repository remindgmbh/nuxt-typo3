import { computed } from 'vue'
import * as T3Model from '../../models'
import { useT3Asset, useT3Config } from '#imports'

export function useT3CeImageGallery(
    content: T3Model.Typo3.Content.Data.ImageGallery
) {
    const config = useT3Config().contentElements?.imageGallery
    const header = computed<string | undefined>(() => content.header)
    const subheader = computed<string | undefined>(() => content.subheader)
    const type = computed(() => content.settings.type)

    const images = computed<T3Model.Image.Attributes[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                fileExtension: config?.images?.fileExtension,
            })
            return imageAttrs.value
        })
    )

    const previewImages = computed<T3Model.Image.Attributes[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config?.gallery?.previewHeight,
                fileExtension: config?.images?.fileExtension,
            })
            return imageAttrs.value
        })
    )

    const navigationImages = computed<T3Model.Image.Attributes[]>(() =>
        content.images.map((asset) => {
            const { imageAttrs } = useT3Asset(asset, {
                maxHeight: config?.gallery?.navigationHeight,
                fileExtension: config?.images?.fileExtension,
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
