import { computed } from 'vue'
import { Api, useConfig, useCeTextmedia } from '#nuxt-typo3'

export function useCeTextpic(
    contentElement: Api.ContentElement<Api.Content.Textpic>
) {
    const textmediaContentElement = computed<
        Api.ContentElement<Api.Content.Textmedia>
    >(() => ({
        ...contentElement,
        content: {
            ...contentElement.content,
            assetPosition: contentElement.content.imagePosition,
            assets: contentElement.content.images,
        },
    }))

    const { imageAttrs } = useCeTextmedia(
        textmediaContentElement.value,
        useConfig().images.ceTextpic
    )

    return { imageAttrs, textmediaContentElement }
}
