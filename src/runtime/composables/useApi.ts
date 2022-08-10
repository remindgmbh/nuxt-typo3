import { computed } from 'vue'
import { NitroFetchRequest } from 'nitropack'
import { FetchError, FetchOptions } from 'ohmyfetch'
import { useRequestHeaders } from '#app'
import { Api, Model, useApiPath, useConfig } from '#nuxt-typo3'

export function useApi() {
    const config = useConfig()
    const apiPath = useApiPath()

    const defaultOptions = computed<FetchOptions>(() => {
        // remove undefined header values
        const headers = Object.fromEntries(
            Object.entries(useRequestHeaders(['cookie'])).filter(
                ([_key, value]) => !!value
            )
        ) as HeadersInit

        return {
            baseURL: config.api.baseUrl,
            credentials: 'include',
            headers,
        }
    })

    async function getInitialData(options?: {
        path?: string
        fetchOptions?: FetchOptions
    }) {
        const type = config.api.initialDataType
        const path = options?.path ?? apiPath.currentInitialDataPath.value
        const fetchOptions = options?.fetchOptions ?? {}
        return await get<Api.InitialData>(path, {
            ...fetchOptions,
            params: { type },
        })
    }

    async function getPageData(options?: {
        path?: string
        fetchOptions?: FetchOptions
    }) {
        const path = options?.path ?? apiPath.currentPagePath.value
        try {
            return await get<Api.PageData>(path, options?.fetchOptions)
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

    async function getFooterContent(options?: {
        path?: string
        fetchOptions?: FetchOptions
    }) {
        const type = config.api.footerContentType
        const path = options?.path ?? apiPath.currentInitialDataPath.value
        const fetchOptions = options?.fetchOptions ?? {}
        return await get<Api.ContentElement<any>>(path, {
            ...fetchOptions,
            params: { type },
        })
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
