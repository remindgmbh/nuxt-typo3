import * as T3Model from '../models'
import { navigateTo, useRoute, useT3Api, useT3Data } from '#imports'
import { computed } from 'vue'

export function useT3UserState() {
    const api = useT3Api()

    const { currentInitialData, currentPageData, clearData } = useT3Data()

    const isLoggedIn = computed<boolean>(
        () => currentInitialData.value?.user?.logged ?? false,
    )

    async function logout(): Promise<void> {
        if (isLoggedIn.value && currentInitialData.value?.user?.logoutLink) {
            const pageData = await api.getPageData(
                currentInitialData.value?.user?.logoutLink,
            )

            const contentElements = Object.values(pageData.content).flat()
            const contentElement = contentElements.find(
                (contentElement) => contentElement.type === 'felogin_login',
            ) as
                | T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.FeloginActionResponse>
                | undefined

            const redirectUrl =
                contentElement?.content.data.redirectUrl ??
                currentPageData.value?.slug

            const initialData = await api.getInitialData(useRoute().fullPath, {
                cache: 'no-cache',
            })
            clearData()
            currentInitialData.value = initialData

            await navigateTo({
                force: true,
                path: redirectUrl,
                replace: true,
            })
        }
    }

    return {
        isLoggedIn,

        logout,
    }
}
