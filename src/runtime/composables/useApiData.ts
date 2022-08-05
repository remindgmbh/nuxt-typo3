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

    const footerContent = useState<Api.ContentElement<any> | undefined>(
        'footerContent'
    )

    const pageData = useState<{
        [path: string]: Api.PageData | undefined
    }>('pageData', () => ({}))

    const pageError = useState<Model.PageError | undefined>('pageError')

    const currentInitialData = computed(
        () => initialData.value[apiPath.currentInitialDataPath.value]
    )

    const rootPageNavigation = computed(() =>
        currentInitialData.value?.navigation.at(0)
    )

    const currentPageData = computed(
        () => pageData.value[apiPath.currentPagePath.value]
    )

    const initialDataLanguages = computed(
        () => currentInitialData.value?.i18n ?? []
    )

    const pageDataLanguages = computed(() => currentPageData.value?.i18n ?? [])

    const languages = computed(() =>
        // page languages may be empty if error occured
        pageDataLanguages.value.length > 0
            ? pageDataLanguages.value.map((pageDataLanguage) => {
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
            : initialDataLanguages.value
    )

    const activeLanguage = computed(() =>
        languages.value.find((language) => language.active)
    )

    async function loadInitialData(path: string) {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!initialData.value[initialDataPath]) {
            const result = await api.getInitialData(initialDataPath)
            initialData.value[initialDataPath] = result
            return result
        }
        return initialData.value[initialDataPath]
    }

    async function loadFooterContent(path: string) {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!footerContent.value) {
            const result = await api.getFooterContent(initialDataPath)
            footerContent.value = result
        }

        return footerContent.value
    }

    async function loadPageData(path: string) {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                const result = await api.getPageData(path)
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
        initialData.value = {}
        pageData.value = {}
    }

    return {
        activeLanguage,
        footerContent,
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
