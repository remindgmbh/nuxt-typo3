import { SearchParams } from 'ohmyfetch'
import { useFetch, useRuntimeConfig, useRoute } from '#app'

export const useTypo3Fetch = () => {
    const typo3Fetch = <T>(args?: { path?: string; params?: SearchParams }) =>
        useFetch<T>(args?.path ?? useRoute().fullPath, {
            baseURL: useBaseUrl(),
            params: args?.params,
        })

    const $typo3Fetch = <T>(args?: { path?: string; params?: SearchParams }) =>
        $fetch<T>(args?.path ?? useRoute().fullPath, {
            baseURL: useBaseUrl(),
            params: args?.params,
        })

    return {
        typo3Fetch,
        $typo3Fetch,
    }
}

const useBaseUrl = () => useRuntimeConfig().public.typo3.api.baseUrl
