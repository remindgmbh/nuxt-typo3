import { computed } from 'vue'
import { useT3Data } from '#imports'

export function useT3Footer<T = unknown>() {
    const { currentInitialData } = useT3Data()

    const footer = computed(
        () => currentInitialData.value?.footer as T | undefined,
    )

    return footer
}
