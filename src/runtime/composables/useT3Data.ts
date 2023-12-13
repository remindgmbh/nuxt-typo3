import { computed, type Ref } from 'vue'
import { Typo3 } from '../models'
import { useLogger, useRoute, useState, useT3Api, useT3Config } from '#imports'

export function useT3Data() {
    const api = useT3Api()
    const config = useT3Config()
    const logger = useLogger()

    function getLocalizedRootPath(path: string): string {
        return (
            config.languages.find(
                (languagePath) =>
                    path.startsWith(languagePath) ||
                    path === languagePath.slice(0, -1),
            ) ?? '/'
        )
    }

    const initialData: Ref<{
        [path: string]: Typo3.InitialData | undefined
    }> = useState('t3-initialData', () => ({}))

    const footerData: Ref<{
        [path: string]: Typo3.Content.Element<any> | undefined
    }> = useState('t3-footerData', () => ({}))

    const pageData: Ref<{
        [path: string]: Typo3.Page.Data | undefined
    }> = useState('t3-pageData', () => ({}))

    const pageError: Ref<Typo3.Page.Error | undefined> =
        useState('t3-pageError')

    const currentPagePath = computed(() => useRoute().fullPath)

    const currentRootPath = computed(() =>
        getLocalizedRootPath(currentPagePath.value),
    )

    const currentInitialData = computed<Typo3.InitialData | undefined>({
        get() {
            return initialData.value[currentRootPath.value]
        },
        set(value) {
            initialData.value[currentRootPath.value] = value
        },
    })

    const currentFooterData = computed<Typo3.Content.Element<any> | undefined>({
        get() {
            return footerData.value[currentRootPath.value]
        },
        set(value) {
            footerData.value[currentRootPath.value] = value
        },
    })

    const currentPageData = computed<Typo3.Page.Data | undefined>({
        get() {
            return pageData.value[currentPagePath.value]
        },
        set(value) {
            pageData.value[currentPagePath.value] = value
        },
    })

    async function loadInitialData(
        path: string,
    ): Promise<Typo3.InitialData | undefined> {
        const rootPath = getLocalizedRootPath(path)

        if (!initialData.value[rootPath]) {
            try {
                const result = await api.getInitialData(rootPath)
                initialData.value[rootPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }
        return initialData.value[rootPath]
    }

    async function loadFooterData(
        path: string,
    ): Promise<Typo3.Content.Element<any> | undefined> {
        const rootPath = getLocalizedRootPath(path)

        if (!footerData.value[rootPath]) {
            try {
                const result = await api.getFooterData(rootPath)
                footerData.value[rootPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }

        return footerData.value[rootPath]
    }

    async function loadPageData(
        path: string,
    ): Promise<Typo3.Page.Data | undefined> {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                const result = await api.getPageData(path)
                pageData.value[path] = result
                return result
            } catch (error) {
                if (error instanceof Typo3.Page.Error) {
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

    function clearData(): void {
        clearFooterData()
        clearInitialData()
        clearPageData()
    }

    function clearFooterData(): void {
        footerData.value = {}
    }

    function clearInitialData(): void {
        initialData.value = {}
    }

    function clearPageData(): void {
        pageData.value = {}
    }

    return {
        currentFooterData,
        currentInitialData,
        currentPageData,
        footerData,
        initialData,
        pageData,
        pageError,
        clearData,
        clearFooterData,
        clearInitialData,
        clearPageData,
        getLocalizedRootPath,
        loadFooterData,
        loadInitialData,
        loadPageData,
    }
}
