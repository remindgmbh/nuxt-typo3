import { useState } from '#app'
import { computed } from 'vue'
import { useLogger } from '#nuxt-logger'
import { T3Api, T3Model } from '#nuxt-typo3'
import { useT3Api } from '#nuxt-typo3/composables/useT3Api'
import { useT3ApiPath } from '#nuxt-typo3/composables/useT3ApiPath'

export function useT3ApiData() {
    const api = useT3Api()
    const apiPath = useT3ApiPath()
    const logger = useLogger()

    const initialData = useState<{
        [path: string]: T3Api.InitialData | undefined
    }>('initialData', () => ({}))

    const footerContent = useState<{
        [path: string]: T3Api.ContentElement<any> | undefined
    }>('footerContent', () => ({}))

    const pageData = useState<{
        [path: string]: T3Api.PageData | undefined
    }>('pageData', () => ({}))

    const pageError = useState<T3Model.PageError | undefined>('pageError')

    const currentInitialData = computed(
        () => initialData.value[apiPath.currentInitialDataPath.value]
    )

    const currentFooterContent = computed(
        () => footerContent.value[apiPath.currentInitialDataPath.value]
    )

    const currentPageData = computed(
        () => pageData.value[apiPath.currentPagePath.value]
    )

    async function loadInitialData(path: string) {
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

    async function loadFooterContent(path: string) {
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

    async function loadPageData(path: string) {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                const result = await api.getPageData({ path })
                pageData.value[path] = result
                return result
            } catch (error) {
                if (error instanceof T3Model.PageError) {
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

    function setCurrentPage(data: T3Api.PageData) {
        pageData.value[apiPath.currentPagePath.value] = data
    }

    function setCurrentInitialData(data: T3Api.InitialData) {
        initialData.value[apiPath.currentInitialDataPath.value] = data
    }

    function clearData() {
        clearInitialData()
        clearPageData()
    }

    function clearInitialData() {
        initialData.value = {}
    }

    function clearPageData() {
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
