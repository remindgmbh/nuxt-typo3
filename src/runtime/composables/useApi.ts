import { computed } from 'vue'
import { FetchError } from 'ohmyfetch'
import { useFetch, useRoute } from '#app'
import { InitialData, PageData, useConfig } from '#nuxt-typo3'

// TODO add $fetch with baseURL

export function useApi() {
    const config = useConfig()
    const baseURL = config.api.baseUrl

    const pagePath = computed(() => useRoute().fullPath)

    const initialDataPath = computed(() => {
        return (
            config.languages.find(
                (languagePath) =>
                    pagePath.value.startsWith(languagePath) ||
                    pagePath.value === languagePath.slice(0, -1)
            ) ?? '/'
        )
    })

    async function getInitialData() {
        const type = config.api.initialDataType
        return await useFetch<InitialData>(initialDataPath.value, {
            baseURL,
            params: { type },
        })
    }

    async function getPageData() {
        return await useFetch<PageData, FetchError<PageData | string>>(
            pagePath.value,
            {
                baseURL,
            }
        )
    }

    return {
        initialDataPath,
        pagePath,
        getInitialData,
        getPageData,
    }
}
