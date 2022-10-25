import { computed } from 'vue'
import { useT3ApiData } from '#nuxt-typo3'

export function useT3Navigation() {
    const { currentInitialData } = useT3ApiData()

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
