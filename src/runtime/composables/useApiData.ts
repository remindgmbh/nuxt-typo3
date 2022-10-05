import { useState } from '#app'
import { computed } from 'vue'
import { Api, Model, useApi, useApiPath } from '#nuxt-typo3'

export function useApiData() {
    const api = useApi()
    const apiPath = useApiPath()
    const logger = useLogger()

    // Remove loading once NuxtLoadingIndicator supports middleware
    // https://github.com/nuxt/framework/pull/5121
    // https://github.com/nuxt/framework/issues/6837
    const initialDataLoading = useState<boolean>(
        'initialDataLoading',
        () => false
    )
    const pageDataLoading = useState<boolean>('pageDataLoading', () => false)
    const footerContentLoading = useState<boolean>(
        'footerContentLoading',
        () => false
    )

    const loading = computed(
        () =>
            initialDataLoading.value ||
            pageDataLoading.value ||
            footerContentLoading.value
    )

    const initialData = useState<{
        [path: string]: Api.InitialData | undefined
    }>('initialData', () => ({}))

    const footerContent = useState<{
        [path: string]: Api.ContentElement<any> | undefined
    }>('footerContent', () => ({}))

    const pageData = useState<{
        [path: string]: Api.PageData | undefined
    }>('pageData', () => ({}))

    const pageError = useState<Model.PageError | undefined>('pageError')

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
                initialDataLoading.value = true
                const result = await api.getInitialData({
                    path: initialDataPath,
                })
                initialData.value[initialDataPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            } finally {
                initialDataLoading.value = false
            }
        }
        return initialData.value[initialDataPath]
    }

    async function loadFooterContent(path: string) {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!footerContent.value[initialDataPath]) {
            try {
                footerContentLoading.value = true
                const result = await api.getFooterContent({
                    path: initialDataPath,
                })
                footerContent.value[initialDataPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            } finally {
                footerContentLoading.value = true
            }
        }

        return footerContent.value[initialDataPath]
    }

    async function loadPageData(path: string) {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                pageDataLoading.value = true
                const result = await api.getPageData({ path })
                pageData.value[path] = result
                return result
            } catch (error) {
                if (error instanceof Model.PageError) {
                    // assigning error directly leads to "Cannot stringify arbitrary non-POJOs PageError"
                    pageError.value = { ...error }
                } else {
                    // log error and do nothing so undefined is returned
                    logger.error(error)
                }
            } finally {
                pageDataLoading.value = true
            }
        }
        return pageData.value[path]
    }

    function setCurrentPage(data: Api.PageData) {
        pageData.value[apiPath.currentPagePath.value] = data
    }

    function setCurrentInitialData(data: Api.InitialData) {
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
        loading,
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
