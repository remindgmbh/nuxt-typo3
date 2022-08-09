import { useRouter } from '#app'
import { computed } from 'vue'
import { Api, useApi, useApiData } from '#nuxt-typo3'

export function useUserState() {
    const api = useApi()
    const router = useRouter()

    const { logoutLink, clearData, setCurrentInitialData } = useApiData()

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

        const result = await api.post<Api.PageData>(url, {
            body,
        })

        await changeUserState(result)
    }

    async function changeUserState(newPageData: Api.PageData) {
        // Clear cached data and get new initialData in case logged out user has reduced access
        const initialData = await api.getInitialData({
            fetchOptions: { cache: 'no-cache' },
        })
        clearData()
        setCurrentInitialData(initialData)

        router.push({ path: newPageData.slug, force: true, replace: true })
    }

    return { isLoggedIn, login, logout }
}
