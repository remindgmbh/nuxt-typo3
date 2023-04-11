import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3ApiData } from '#nuxt-typo3/composables/useT3ApiData'

export function useT3Navigation() {
    const { currentInitialData } = useT3ApiData()

    const rootPageNavigation = computed<T3Api.NavItem | undefined>(() =>
        currentInitialData.value?.navigation.at(0)
    )

    const navItemsWithChildren = computed<T3Api.NavItem[]>(() =>
        (rootPageNavigation.value?.children ?? []).filter(
            (child) => child.children
        )
    )

    return { rootPageNavigation, navItemsWithChildren }
}
