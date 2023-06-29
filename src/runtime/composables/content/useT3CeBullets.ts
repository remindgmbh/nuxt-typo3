import { computed } from 'vue'
import * as T3Model from '../../models'

export function useT3CeBullets(
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Bullets>
) {
    const tag = computed(() =>
        contentElement.content.bulletsType === 1 ? 'ol' : 'ul'
    )
    return { tag }
}
