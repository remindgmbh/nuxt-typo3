import { SearchParams } from 'ohmyfetch'
import { useRuntimeConfig, useRoute } from '#app'

// TODO replace $fetch with useFetch once this issue is resolved: https://github.com/nuxt/framework/issues/2122

export function useTypo3Fetch<T>(args?: {
    path?: string
    params?: SearchParams
}) {
    const baseURL = useRuntimeConfig().public.typo3.api.baseUrl

    return $fetch<T>(args?.path ?? useRoute().fullPath, {
        baseURL,
        params: args?.params,
    })
}
