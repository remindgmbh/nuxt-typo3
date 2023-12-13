import { computed, type Ref } from 'vue'
import { Typo3 } from '../models'
import { useLogger, useState, useT3Api, useT3ApiPath } from '#imports'

export function useT3ApiData() {
    const api = useT3Api()
    const apiPath = useT3ApiPath()
    const logger = useLogger()

    const initialData: Ref<{
        [path: string]: Typo3.InitialData | undefined
    }> = useState('t3-initialData', () => ({}))

    const footerContent: Ref<{
        [path: string]: Typo3.Content.Element<any> | undefined
    }> = useState('t3-footerContent', () => ({}))

    const pageData: Ref<{
        [path: string]: Typo3.Page.Data | undefined
    }> = useState('t3-pageData', () => ({}))

    const pageError: Ref<Typo3.Page.Error | undefined> =
        useState('t3-pageError')

    const currentInitialData = computed<Typo3.InitialData | undefined>(
        () => initialData.value[apiPath.currentInitialDataPath.value],
    )

    const currentFooterContent = computed<
        Typo3.Content.Element<any> | undefined
    >(() => footerContent.value[apiPath.currentInitialDataPath.value])

    const currentPageData = computed<Typo3.Page.Data | undefined>(
        () => pageData.value[apiPath.currentPagePath.value],
    )

    async function loadInitialData(
        path: string,
    ): Promise<Typo3.InitialData | undefined> {
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
        path: string,
    ): Promise<Typo3.Content.Element<any> | undefined> {
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
        path: string,
    ): Promise<Typo3.Page.Data | undefined> {
        pageError.value = {}
        if (!pageData.value[path]) {
            try {
                const result = await api.getPageData({ path })
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

    function setCurrentPage(data: Typo3.Page.Data): void {
        pageData.value[apiPath.currentPagePath.value] = data
    }

    function setCurrentInitialData(data: Typo3.InitialData): void {
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

    function findContentElement<T>(
        filter: (contentElement: Typo3.Content.Element) => boolean,
    ) {
        function isContentElement(
            contentElement: Typo3.Content.Element,
        ): contentElement is Typo3.Content.Element<T> {
            return filter(contentElement)
        }

        return Object.values(currentPageData.value?.content ?? {})
            .flat()
            .find(isContentElement)
    }

    function findContentElementById<T>(
        id: number,
    ): Typo3.Content.Element<T> | undefined {
        return findContentElement<T>(
            (contentElement) => contentElement.id === id,
        )
    }

    function findContentElementByType<T>(
        type: string,
    ): Typo3.Content.Element<T> | undefined {
        return findContentElement<T>(
            (contentElement) => contentElement.type === type,
        )
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
        findContentElementById,
        findContentElementByType,
        loadFooterContent,
        loadInitialData,
        loadPageData,
        setCurrentInitialData,
        setCurrentPage,
    }
}
