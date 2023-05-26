import { computed } from 'vue'
import * as T3Model from '../../models'
import { useT3Config } from '#imports'

export function useT3CeImage(
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Image>
) {
    const config = useT3Config().contentElements.image

    const image = computed<T3Model.Typo3.Asset | undefined>(() =>
        contentElement.content.images.at(0)
    )

    const imageAttrs = computed(() => ({
        fileExtension: config?.images?.fileExtension,
    }))

    return { image, imageAttrs }
}
