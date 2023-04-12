import { computed } from 'vue'
import * as T3Api from '../api'
import { useT3ApiData } from '#imports'

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
