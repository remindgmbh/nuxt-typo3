import { navigateTo } from '#app'
import { computed } from 'vue'
import { T3Api, useT3Api, useT3ApiData } from '#nuxt-typo3'

export function useT3UserState() {
    const api = useT3Api()

    const { currentInitialData, clearData, setCurrentInitialData } =
        useT3ApiData()

    const logoutLink = computed(() => currentInitialData.value?.logoutLink)

    const isLoggedIn = computed(() => !!logoutLink.value)

    async function logout() {
        if (logoutLink.value) {
            const pageData = await api.getPageData({ path: logoutLink.value })
            changeUserState(pageData)
        }
    }

    async function login(url: string, data: Record<string, any>) {
        const body = new FormData()

        Object.keys(data).forEach((key) => {
            body.set(key, data[key])
        })

        const result = await api.post<T3Api.PageData>(url, {
            body,
        })

        await changeUserState(result)
    }

    async function changeUserState(newPageData: T3Api.PageData) {
        // Clear cached data and get new initialData in case logged out user has reduced access
        const initialData = await api.getInitialData({
            fetchOptions: { cache: 'no-cache' },
        })
        clearData()
        setCurrentInitialData(initialData)

        await navigateTo({ path: newPageData.slug, force: true, replace: true })
    }

    return { isLoggedIn, login, logout }
}
