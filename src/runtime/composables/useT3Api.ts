import { NitroFetchRequest } from 'nitropack'
import { FetchError, FetchOptions } from 'ofetch'
import { computed } from 'vue'
import * as T3Model from '../models'
import { useRequestHeaders, useT3ApiPath, useT3Config } from '#imports'

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
    }): Promise<T3Model.Typo3.InitialData> {
        const type = config.api.initialDataType

        // .d.ts file becomes empty if _path or _fetchOptions are named identical to options param property
        // doesn't happen with new project, needs to be investigated further
        const _path = options?.path ?? apiPath.currentInitialDataPath.value
        const _fetchOptions = options?.fetchOptions ?? {}
        return await get<T3Model.Typo3.InitialData>(_path, {
            ..._fetchOptions,
            params: { type },
        })
    }

    async function getPageData(options?: {
        path?: string
        fetchOptions?: FetchOptions
    }): Promise<T3Model.Typo3.Page.Data> {
        const _path = options?.path ?? apiPath.currentPagePath.value
        try {
            return await get<T3Model.Typo3.Page.Data>(
                _path,
                options?.fetchOptions
            )
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

    async function getFooterContent(options?: {
        path?: string
        fetchOptions?: FetchOptions
    }): Promise<T3Model.Typo3.Content.Element<any>> {
        const type = config.api.footerContentType
        const _path = options?.path ?? apiPath.currentInitialDataPath.value
        const _fetchOptions = options?.fetchOptions ?? {}
        return await get<T3Model.Typo3.Content.Element<any>>(_path, {
            ..._fetchOptions,
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
