import { computed } from 'vue'
import { useLogger } from '#nuxt-logger'
import * as T3Model from '../models'
import { useState, useT3Api, useT3ApiPath } from '#imports'

export function useT3ApiData() {
    const api = useT3Api()
    const apiPath = useT3ApiPath()
    const logger = useLogger()

    const initialData = useState<{
        [path: string]: T3Model.Typo3.InitialData | undefined
    }>('initialData', () => ({}))

    const footerContent = useState<{
        [path: string]: T3Model.Typo3.Content.Element<any> | undefined
    }>('footerContent', () => ({}))

    const pageData = useState<{
        [path: string]: T3Model.Typo3.Page.Data | undefined
    }>('pageData', () => ({}))

    const pageError = useState<T3Model.Typo3.Page.Error | undefined>(
        'pageError'
    )

    const currentInitialData = computed<T3Model.Typo3.InitialData | undefined>(
        () => initialData.value[apiPath.currentInitialDataPath.value]
    )

    const currentFooterContent = computed<
        T3Model.Typo3.Content.Element<any> | undefined
    >(() => footerContent.value[apiPath.currentInitialDataPath.value])

    const currentPageData = computed<T3Model.Typo3.Page.Data | undefined>(
        () => pageData.value[apiPath.currentPagePath.value]
    )

    async function loadInitialData(
        path: string
    ): Promise<T3Model.Typo3.InitialData | undefined> {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!initialData.value[initialDataPath]) {
            try {
                const result = await api.getInitialData({
                    path: initialDataPath,
                })
                initialData.value[initialDataPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }
        return initialData.value[initialDataPath]
    }

    async function loadFooterContent(
        path: string
    ): Promise<T3Model.Typo3.Content.Element<any> | undefined> {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!footerContent.value[initialDataPath]) {
            try {
                const result = await api.getFooterContent({
                    path: initialDataPath,
                })
                footerContent.value[initialDataPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }

        return footerContent.value[initialDataPath]
    }

    async function loadPageData(
        path: string
    ): Promise<T3Model.Typo3.Page.Data | undefined> {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                const result = await api.getPageData({ path })
                pageData.value[path] = result
                return result
            } catch (error) {
                if (error instanceof T3Model.Typo3.Page.Error) {
                    // assigning error directly leads to "Cannot stringify arbitrary non-POJOs PageError"
                    pageError.value = { ...error }
                } else {
                    // log error and do nothing so undefined is returned
                    logger.error(error)
                }
            }
        }
        return pageData.value[path]
    }

    function setCurrentPage(data: T3Model.Typo3.Page.Data): void {
        pageData.value[apiPath.currentPagePath.value] = data
    }

    function setCurrentInitialData(data: T3Model.Typo3.InitialData): void {
        initialData.value[apiPath.currentInitialDataPath.value] = data
    }

    function clearData(): void {
        clearInitialData()
        clearPageData()
    }

    function clearInitialData(): void {
        initialData.value = {}
    }

    function clearPageData(): void {
        pageData.value = {}
    }

    return {
        currentFooterContent,
        currentInitialData,
        currentPageData,
        pageData,
        pageError,
        clearData,
        clearInitialData,
        clearPageData,
        loadFooterContent,
        loadInitialData,
        loadPageData,
        setCurrentInitialData,
        setCurrentPage,
    }
}
