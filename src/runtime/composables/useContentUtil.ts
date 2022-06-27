import { computed } from 'vue'
import { Api, useConfig } from '#nuxt-typo3'

export function useContentUtil(contentElement: Api.ContentElement) {
    const config = useConfig()

    const isFullWidth = computed(
        () => config.contentElements[contentElement.type]?.fullWidth
    )

    return {
        isFullWidth,
    }
}
