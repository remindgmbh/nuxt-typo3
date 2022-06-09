import { useState } from '#app'
import { computed } from 'vue'
import { Api, Model, useApi, useApiPath } from '#nuxt-typo3'

export function useApiData() {
    const api = useApi()
    const apiPath = useApiPath()

    const loading = useState<boolean>('loading', () => false)

    const initialDataCache = useState<{
        [path: string]: Api.InitialData | undefined
    }>('initialData', () => ({}))

    const pageDataCache = useState<{
        [path: string]: Api.PageData | undefined
    }>('pageData', () => ({}))

    const pageError = useState<Model.PageError | undefined>('pageError')

    const initialData = computed(
        () => initialDataCache.value[apiPath.currentInitialDataPath.value]
    )

    const rootPageNavigation = computed(() =>
        initialData.value?.navigation.at(0)
    )

    const pageData = computed(
        () =>
            pageDataCache.value[apiPath.currentPagePath.value] ??
            pageError.value?.data
    )

    const initialDataLanguages = computed(() => initialData.value?.i18n ?? [])

    const pageDataLanguages = computed(() => pageData.value?.i18n ?? [])

    const languages = computed(() =>
        pageDataLanguages.value.map((pageDataLanguage) => {
            if (pageDataLanguage.available) {
                return pageDataLanguage
            } else {
                // if current page doesn't exist in selected language show link to root page
                return (
                    initialDataLanguages.value.find(
                        (initialDataLanguage) =>
                            initialDataLanguage.languageId ===
                            pageDataLanguage.languageId
                    ) ?? pageDataLanguage
                )
            }
        })
    )

    const activeLanguage = computed(() =>
        languages.value.find((language) => language.active)
    )

    async function loadInitialData(path: string) {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!initialDataCache.value[initialDataPath]) {
            const result = await api.getInitialData(initialDataPath)
            initialDataCache.value[initialDataPath] = result
        }
    }

    async function loadPageData(path: string) {
        pageError.value = {}
        if (!pageDataCache.value[path]) {
            try {
                const result = await api.getPageData(path)
                pageDataCache.value[path] = result
            } catch (error) {
                if (error instanceof Model.PageError) {
                    // assigning error directly leads to "Cannot stringify arbitrary non-POJOs PageError"
                    pageError.value = { ...error }
                }
            }
        }
    }

    async function loadAllData(path: string) {
        loading.value = true

        await Promise.all([loadInitialData(path), loadPageData(path)])

        loading.value = false
    }

    function setCurrentPage(data: Api.PageData) {
        pageDataCache.value[apiPath.currentPagePath.value] = data
    }

    function setCurrentInitialData(data: Api.InitialData) {
        initialDataCache.value[apiPath.currentInitialDataPath.value] = data
    }

    function clearData() {
        initialDataCache.value = {}
        pageDataCache.value = {}
    }

    return {
        activeLanguage,
        languages,
        loading,
        pageData,
        pageError,
        rootPageNavigation,
        clearData,
        loadAllData,
        setCurrentInitialData,
        setCurrentPage,
    }
}
