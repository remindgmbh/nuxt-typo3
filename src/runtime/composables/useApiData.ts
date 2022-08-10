import { useState } from '#app'
import { computed } from 'vue'
import { Api, Model, useApi, useApiPath } from '#nuxt-typo3'

export function useApiData() {
    const api = useApi()
    const apiPath = useApiPath()

    const loading = useState<boolean>('loading', () => false)

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
            const result = await api.getInitialData({ path: initialDataPath })
            initialData.value[initialDataPath] = result
            return result
        }
        return initialData.value[initialDataPath]
    }

    async function loadFooterContent(path: string) {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!footerContent.value[initialDataPath]) {
            const result = await api.getFooterContent({ path: initialDataPath })
            footerContent.value[initialDataPath] = result
            return result
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
                if (error instanceof Model.PageError) {
                    // assigning error directly leads to "Cannot stringify arbitrary non-POJOs PageError"
                    pageError.value = { ...error }
                }
            }
        }
        return pageData.value[path]
    }

    async function loadAllData(
        path: string
    ): Promise<
        [
            Api.ContentElement<any> | undefined,
            Api.InitialData | undefined,
            Api.PageData | undefined
        ]
    > {
        loading.value = true

        const [footerContent, initialData, pageData] = await Promise.all([
            loadFooterContent(path),
            loadInitialData(path),
            loadPageData(path),
        ])

        loading.value = false

        return [footerContent, initialData, pageData]
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
        loadAllData,
        setCurrentInitialData,
        setCurrentPage,
    }
}
