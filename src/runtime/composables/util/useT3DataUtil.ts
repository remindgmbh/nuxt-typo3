import type { T3Model } from '#imports'

export function useT3DataUtil() {
    function findContentElement<T>(
        filter: (contentElement: T3Model.Typo3.Content.Element) => boolean,
        pageData: T3Model.Typo3.Page,
    ) {
        function isContentElement(
            contentElement: T3Model.Typo3.Content.Element,
        ): contentElement is T3Model.Typo3.Content.Element<T> {
            return filter(contentElement)
        }

        return Object.values(pageData.content ?? {})
            .flat()
            .find(isContentElement)
    }

    function findContentElementById<T>(
        id: number,
        pageData: T3Model.Typo3.Page,
    ): T3Model.Typo3.Content.Element<T> | undefined {
        return findContentElement<T>(
            (contentElement) => contentElement.id === id,
            pageData,
        )
    }

    function findContentElementByType<T>(
        type: string,
        pageData: T3Model.Typo3.Page,
    ): T3Model.Typo3.Content.Element<T> | undefined {
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
