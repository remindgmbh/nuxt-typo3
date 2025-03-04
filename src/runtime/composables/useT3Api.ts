import {
    T3Error,
    type T3Model,
    useAppConfig,
    useRequestHeaders,
} from '#imports'
import type { FetchOptions } from 'ofetch'
import type { NitroFetchRequest } from 'nitropack'
import { computed } from 'vue'

export function useT3Api() {
    const { typo3: config } = useAppConfig()

    const defaultOptions = computed<FetchOptions>(() => {
        // remove undefined header values
        const headers = Object.fromEntries(
            Object.entries(useRequestHeaders(['cookie'])).filter(
                ([_key, value]) => !!value,
            ),
        ) as HeadersInit

        return {
            baseURL: config.api.baseUrl,
            credentials: 'include',
            headers,
        }
    })

    async function getInitialData(
        path: string,
        options: FetchOptions = {},
    ): Promise<T3Model.Typo3.InitialData> {
        const type = config.api.initialDataType

        return await get<T3Model.Typo3.InitialData>(path, {
            ...options,
            params: {
                type,
            },
        })
    }

    async function getPageData(
        path: string,
        options: FetchOptions = {},
    ): Promise<T3Model.Typo3.Page | T3Model.Typo3.Redirect> {
        return await get<T3Model.Typo3.Page | T3Model.Typo3.Redirect>(path, {
            ...options,
            async onResponseError({ response }) {
                const pageError = new T3Error.PageError()
                pageError.status = response.status

                if (typeof response._data !== 'string') {
                    if (!pageIsRedirect(response._data)) {
                        pageError.data = response._data
                    }
                } else {
                    pageError.html = response._data
                }

                throw pageError
            },
            retry: false,
        })
    }

    function pageIsRedirect(
        page: T3Model.Typo3.Page | T3Model.Typo3.Redirect,
    ): page is T3Model.Typo3.Redirect {
        return (page as T3Model.Typo3.Redirect).redirectUrl !== undefined
    }

    async function get<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions,
    ): Promise<T> {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            ...options,
            method: 'GET',
        })
    }

    async function post<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions,
    ): Promise<T> {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            ...options,
            method: 'POST',
        })
    }

    return {
        get,
        getInitialData,
        getPageData,
        pageIsRedirect,
        post,
    }
}
