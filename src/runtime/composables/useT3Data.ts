import { type Ref, computed } from 'vue'
import { useLogger, useRoute, useState, useT3Api, useT3Config } from '#imports'
import { Typo3 } from '../models'

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
        currentInitialData,
        currentPageData,
        initialData,
        pageData,
        pageError,

        clearData,
        clearInitialData,
        clearPageData,
        getLocalizedRootPath,
        loadInitialData,
        loadPageData,
    }
}
