import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'
import { useT3Cookiebot } from '#nuxt-typo3/composables/useT3Cookiebot'

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
