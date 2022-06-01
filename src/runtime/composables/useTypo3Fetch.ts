import { SearchParams } from 'ohmyfetch'
import { useFetch, useRuntimeConfig, useRoute } from '#app'

export function useTypo3Fetch() {
    const useBaseUrl = () => useRuntimeConfig().public.typo3.api.baseUrl

    function typo3Fetch<T>(args?: { path?: string; params?: SearchParams }) {
        return useFetch<T>(args?.path ?? useRoute().fullPath, {
            baseURL: useBaseUrl(),
            params: args?.params,
        })
    }

    function $typo3Fetch<T>(args?: { path?: string; params?: SearchParams }) {
        return $fetch<T>(args?.path ?? useRoute().fullPath, {
            baseURL: useBaseUrl(),
            params: args?.params,
        })
    }

    return {
        typo3Fetch,
        $typo3Fetch,
    }
}
