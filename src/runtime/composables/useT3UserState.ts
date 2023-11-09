import { computed } from 'vue'
import * as T3Model from '../models'
import { navigateTo, useT3Api, useT3ApiData } from '#imports'

export function useT3UserState() {
    const api = useT3Api()

    const {
        currentInitialData,
        currentPageData,
        clearData,
        setCurrentInitialData,
    } = useT3ApiData()

    const logoutLink = computed<string | undefined>(
        () => currentInitialData.value?.user.logoutLink,
    )

    const isLoggedIn = computed<boolean>(() => !!logoutLink.value)

    async function logout(): Promise<void> {
        if (logoutLink.value) {
            const pageData = await api.getPageData({ path: logoutLink.value })

            const contentElements = Object.values(pageData.content).flat()
            const contentElement = contentElements.find(
                (contentElement) => contentElement.type === 'felogin_login',
            ) as
                | T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.FeloginActionResponse>
                | undefined

            const redirectUrl =
                contentElement?.content.data.redirectUrl ??
                currentPageData.value?.slug

            const initialData = await api.getInitialData({
                fetchOptions: { cache: 'no-cache' },
            })
            clearData()
            setCurrentInitialData(initialData)

            await navigateTo({
                path: redirectUrl,
                force: true,
                replace: true,
            })
        }
    }

    return { isLoggedIn, logout }
}
