import { type T3Model, useRoute, useT3Data } from '#imports'
import { computed } from 'vue'

export function useT3Navigation() {
    const route = useRoute()
    const { currentInitialData } = useT3Data()

    const rootPageNavigation = computed<T3Model.Typo3.NavItem | undefined>(() =>
        currentInitialData.value?.navigation.at(0),
    )

    const navItemsWithChildren = computed<T3Model.Typo3.NavItem[]>(() =>
        (rootPageNavigation.value?.children ?? []).filter(
            (child) => child.children,
        ),
    )

    const activeNavItems = computed<T3Model.Typo3.NavItem[]>(() =>
        rootPageNavigation.value
            ? (getActiveNavItems(route.path, rootPageNavigation.value) ?? [])
            : [],
    )

    function getActiveNavItems(
        path: string,
        navItem: T3Model.Typo3.NavItem,
        result: T3Model.Typo3.NavItem[] = [],
        deleteCount = 0,
    ): T3Model.Typo3.NavItem[] | undefined {
        result.push(navItem)
        if (navItem.link === path) {
            return result
        } else if (navItem.children) {
            deleteCount++
            for (const childNavItem of navItem.children) {
                const childResult = getActiveNavItems(
                    path,
                    childNavItem,
                    result,
                    deleteCount,
                )
                if (childResult) {
                    return childResult
                }
            }
        } else {
            result.splice(1, deleteCount)
        }
    }

    return {
        activeNavItems,
        navItemsWithChildren,
        rootPageNavigation,
    }
}
