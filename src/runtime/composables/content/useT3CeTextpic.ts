import { computed } from 'vue'
import * as T3Api from '../../api'

export function useT3CeTextpic(
    contentElement: T3Api.ContentElement<T3Api.Content.Textpic>
) {
    const textmediaContentElement = computed<
        T3Api.ContentElement<T3Api.Content.Textmedia>
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
