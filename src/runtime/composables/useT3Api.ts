import * as T3Model from '../models'
import { FetchError, type FetchOptions } from 'ofetch'
import { useRequestHeaders, useT3Config } from '#imports'
import { type NitroFetchRequest } from 'nitropack'
import { computed } from 'vue'

export function useT3Api() {
    const config = useT3Config()

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
    ): Promise<T3Model.Typo3.Page.Data> {
        try {
            return await get<T3Model.Typo3.Page.Data>(path, options)
        } catch (error) {
            if (error instanceof FetchError) {
                const pageError = new T3Model.Typo3.Page.Error()
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

    async function get<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions,
    ) {
        return await $fetch<T>(request, {
            ...defaultOptions.value,
            ...options,
            method: 'GET',
        })
    }

    async function post<T = unknown>(
        request: NitroFetchRequest,
        options?: FetchOptions,
    ) {
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
        post,
    }
}
