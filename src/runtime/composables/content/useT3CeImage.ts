import * as T3Model from '../../models'
import { type Ref, computed } from 'vue'

export function useT3CeImage(
    contentElement: Ref<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Image>
    >,
) {
    const image = computed<T3Model.Typo3.Asset | undefined>(() =>
        contentElement.value.content.images.at(0),
    )

    return { image }
}
