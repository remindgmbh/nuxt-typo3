import { computed } from 'vue'
import * as T3Model from '../../models'

export function useT3CeTextpic(
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Textpic>
) {
    const textmediaContentElement = computed<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Textmedia>
    >(() => ({
        ...contentElement,
        content: {
            ...contentElement.content,
            assetPosition: contentElement.content.imagePosition,
            assets: contentElement.content.images,
        },
    }))

    return { textmediaContentElement }
}
