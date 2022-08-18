import { computed } from 'vue'
import { Api, useConfig, useCookiebot } from '#nuxt-typo3'

export function useContentUtil(contentElement: Api.ContentElement) {
    const config = useConfig()
    const { isAccepted } = useCookiebot()

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
