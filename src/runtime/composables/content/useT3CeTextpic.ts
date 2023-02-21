import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'
import { useT3CeTextmedia } from '#nuxt-typo3/composables/content/useT3CeTextmedia'

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

    const { imageAttrs } = useT3CeTextmedia(
        textmediaContentElement.value,
        useT3Config().images.ceTextpic
    )

    return { imageAttrs, textmediaContentElement }
}
