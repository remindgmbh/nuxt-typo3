import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'
import { useT3Cookiebot } from '#nuxt-typo3/composables/useT3Cookiebot'
import { useT3Theme } from '#nuxt-typo3/composables/useT3Theme'

export function useT3ContentUtil(contentElement: T3Api.ContentElement) {
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { colors, spacing } = useT3Theme()

    const color = computed(
        () => colors.value[contentElement.appearance.backgroundColor]
    )

    const cookieAccepted = computed(() =>
        isAccepted(contentElement.cookie.category)
    )

    const ignoreCookies = computed(
        () => config.contentElements[contentElement.type]?.ignoreCookies
    )

    const isFullWidth = computed(
        () => config.contentElements[contentElement.type]?.fullWidth
    )

    const spaceBefore = computed(
        () => spacing.value[contentElement.appearance.spaceBefore]
    )
    const spaceAfter = computed(
        () => spacing.value[contentElement.appearance.spaceAfter]
    )
    const spaceBeforeInside = computed(
        () =>
            contentElement.appearance.backgroundColor &&
            spacing.value[contentElement.appearance.spaceBeforeInside]
    )
    const spaceAfterInside = computed(
        () =>
            contentElement.appearance.backgroundColor &&
            spacing.value[contentElement.appearance.spaceAfterInside]
    )

    return {
        cookieAccepted,
        color,
        ignoreCookies,
        isFullWidth,
        spaceBefore,
        spaceAfter,
        spaceBeforeInside,
        spaceAfterInside,
    }
}
