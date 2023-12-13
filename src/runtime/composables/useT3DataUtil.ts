import { Typo3 } from '../models'

export function useT3ApiData() {
    function findContentElement<T>(
        filter: (contentElement: Typo3.Content.Element) => boolean,
        pageData: Typo3.Page.Data,
    ) {
        function isContentElement(
            contentElement: Typo3.Content.Element,
        ): contentElement is Typo3.Content.Element<T> {
            return filter(contentElement)
        }

        return Object.values(pageData.content ?? {})
            .flat()
            .find(isContentElement)
    }

    function findContentElementById<T>(
        id: number,
        pageData: Typo3.Page.Data,
    ): Typo3.Content.Element<T> | undefined {
        return findContentElement<T>(
            (contentElement) => contentElement.id === id,
            pageData,
        )
    }

    function findContentElementByType<T>(
        type: string,
        pageData: Typo3.Page.Data,
    ): Typo3.Content.Element<T> | undefined {
        return findContentElement<T>(
            (contentElement) => contentElement.type === type,
            pageData,
        )
    }

    return {
        findContentElement,
        findContentElementById,
        findContentElementByType,
    }
}
