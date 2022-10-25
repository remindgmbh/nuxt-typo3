import { computed } from 'vue'
import { T3Api, useT3Config, useT3Cookiebot } from '#nuxt-typo3'

export function useT3ContentUtil(contentElement: T3Api.ContentElement) {
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()

    const cookieAccepted = computed(() =>
        isAccepted(contentElement.cookie.category)
    )

    const ignoreCookies = computed(
        () => config.contentElements[contentElement.type]?.ignoreCookies
    )

    const isFullWidth = computed(
        () => config.contentElements[contentElement.type]?.fullWidth
    )

    return {
        cookieAccepted,
        ignoreCookies,
        isFullWidth,
    }
}
