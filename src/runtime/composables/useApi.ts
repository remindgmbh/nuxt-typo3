import { computed } from 'vue'
import { NitroFetchRequest } from 'nitropack'
import { FetchError, FetchOptions } from 'ohmyfetch'
import { useRequestHeaders } from '#app'
import { Api, Model, useApiPath, useConfig } from '#nuxt-typo3'

export function useApi() {
    const config = useConfig()
    const apiPath = useApiPath()

    const defaultOptions = computed<FetchOptions>(() => ({
        baseURL: config.api.baseUrl,
        credentials: 'include',
        headers: useRequestHeaders(['cookie']),
    }))

    async function getInitialData(
        path: string = apiPath.currentInitialDataPath.value
    ) {
        const type = config.api.initialDataType
        return await get<Api.InitialData>(path, { params: { type } })
    }

    async function getPageData(path: string = apiPath.currentPagePath.value) {
        try {
            return await get<Api.PageData>(path)
        } catch (error) {
            if (error instanceof FetchError) {
                const pageError = new Model.PageError()
                pageError.message = error.message
                pageError.status = error.response?.status
                pageError.statusText = error.response?.statusText
                pageError.url = error.response?.url
                if (typeof error.data !== 'string') {
                    pageError.data = error.data
                }
                throw pageError
            } else {
                throw error
            }
        }
    }

    async function getFooterContent(
        path: string = apiPath.currentInitialDataPath.value
    ) {
        const type = config.api.footerContentType
        return await get<Api.ContentElement<any>>(path, { params: { type } })
    }

    async function get<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions
    ) {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            method: 'GET',
            ...options,
        })
    }

    async function post<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions
    ) {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            method: 'POST',
            ...options,
        })
    }

    return {
        getFooterContent,
        getInitialData,
        getPageData,
        get,
        post,
    }
}
