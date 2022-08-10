import { computed } from 'vue'
import { useApiData } from '#nuxt-typo3'

export function useNavigation() {
    const { currentInitialData } = useApiData()

    const rootPageNavigation = computed(() =>
        currentInitialData.value?.navigation.at(0)
    )

    const navItemsWithChildren = computed(() =>
        (rootPageNavigation.value?.children ?? []).filter(
            (child) => child.children
        )
    )

    return { rootPageNavigation, navItemsWithChildren }
}
