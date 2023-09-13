import { computed } from 'vue'
import * as T3Model from '../../models'

export function useT3CeImage(
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Image>
) {
    const image = computed<T3Model.Typo3.Asset | undefined>(() =>
        contentElement.content.images.at(0)
    )

    return { image }
}
