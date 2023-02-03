import { computed } from 'vue'
import { NitroFetchRequest } from 'nitropack'
import { FetchError, FetchOptions } from 'ofetch'
import { useRequestHeaders } from '#app'
import { T3Api, T3Model, useT3ApiPath, useT3Config } from '#nuxt-typo3'

export function useT3Api() {
    const config = useT3Config()
    const apiPath = useT3ApiPath()

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
        return await get<T3Api.InitialData>(path, {
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
            return await get<T3Api.PageData>(path, options?.fetchOptions)
        } catch (error) {
            if (error instanceof FetchError) {
                const pageError = new T3Model.PageError()
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
        return await get<T3Api.ContentElement<any>>(path, {
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
            ...options,
            method: 'GET',
        })
    }

    async function post<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions
    ) {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            ...options,
            method: 'POST',
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
