import * as T3Model from '../../models'
import { computed } from 'vue'

export function useT3Bullets(content: T3Model.Typo3.Content.Data.Bullets) {
    const tag = computed(() => (content.bulletsType === 1 ? 'ol' : 'ul'))
    return { tag }
}
