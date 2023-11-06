import { computed, Ref } from 'vue'
import * as T3Model from '../../models'

export function useT3CeBullets(
    contentElement: Ref<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Bullets>
    >
) {
    const tag = computed(() =>
        contentElement.value.content.bulletsType === 1 ? 'ol' : 'ul'
    )
    return { tag }
}
