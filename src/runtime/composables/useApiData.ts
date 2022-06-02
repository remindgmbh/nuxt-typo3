import { useAsyncData } from '#app'
import { computed } from 'vue'
import { InitialData, useApi, PageData } from '#nuxt-typo3'
import { useAsyncDataWithError } from '#nuxt-typo3/composables/useAsyncDataWithError'

export interface PageError {
    data?: PageData
    message?: string
    url?: string
    status?: number
    statusText?: string
}

export async function useApiData() {
    const api = useApi()

    async function getInitialData() {
        return await useAsyncData<InitialData>(
            'initialData',
            async () => {
                const { data } = await api.getInitialData()

                // TODO Error handling

                return data.value
            },
            {
                watch: [api.initialDataPath],
            }
        )
    }

    async function getPageData() {
        return await useAsyncDataWithError<PageData, PageError>(
            'pageData',
            async () => {
                const { data, error } = await api.getPageData()

                if (error.value) {
                    const pageError: PageError = {}
                    if (typeof error.value !== 'boolean') {
                        pageError.message = error.value.message
                        pageError.status = error.value.response?.status
                        pageError.statusText = error.value.response?.statusText
                        pageError.url = error.value.response?.url
                        if (typeof error.value.data !== 'string') {
                            pageError.data = error.value.data
                        }
                    }
                    throw pageError
                } else {
                    return data.value
                }
            },
            {
                watch: [api.pagePath],
            }
        )
    }

    const [initialDataResult, pageDataResult] = await Promise.all([
        getInitialData(),
        getPageData(),
    ])

    const initialData = computed<InitialData | undefined>(
        () => initialDataResult.data.value
    )

    const rootPageNavigation = computed(() =>
        initialData.value?.navigation.at(0)
    )

    const pageError = computed(() =>
        typeof pageDataResult.error.value === 'boolean'
            ? {}
            : pageDataResult.error.value
    )

    const pageData = computed<PageData | undefined>(() => {
        if (pageDataResult.data.value) {
            return pageDataResult.data.value
        } else if (pageError.value) {
            return pageError.value.data
        } else {
            return undefined
        }
    })

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

    return {
        rootPageNavigation,
        languages,
        pageData,
        pageError,
        updatePageData: pageDataResult.refresh,
    }
}
