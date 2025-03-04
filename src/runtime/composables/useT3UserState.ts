import {
    type T3Model,
    navigateTo,
    useRoute,
    useT3Api,
    useT3Data,
    useT3DataUtil,
} from '#imports'
import { computed } from 'vue'

export function useT3UserState() {
    const api = useT3Api()

    const { currentInitialData, currentPageData, clearData } = useT3Data()
    const { findContentElementByType } = useT3DataUtil()

    const isLoggedIn = computed<boolean>(
        () => currentInitialData.value?.user?.logged ?? false,
    )

    async function logout(): Promise<void> {
        if (isLoggedIn.value && currentInitialData.value?.user?.logoutLink) {
            const pageData = await api.getPageData(
                currentInitialData.value?.user?.logoutLink,
            )

            if (api.pageIsRedirect(pageData)) {
                throw new Error('Logout Link is redirect')
            }

            const contentElement =
                findContentElementByType<T3Model.Typo3.Content.Data.FeloginActionResponse>(
                    'felogin_login',
                    pageData,
                )

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
