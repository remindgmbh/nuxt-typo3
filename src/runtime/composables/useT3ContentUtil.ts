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

    const cookieAccepted = computed<boolean>(() =>
        isAccepted(contentElement.cookie.category)
    )

    const ignoreCookies = computed<boolean>(
        () =>
            config.contentElements[contentElement.type]?.ignoreCookies ?? false
    )

    const isFullWidth = computed<boolean>(
        () => config.contentElements[contentElement.type]?.fullWidth ?? false
    )

    const spaceBefore = computed<string>(
        () => spacing.value[contentElement.appearance.spaceBefore]
    )
    const spaceAfter = computed<string>(
        () => spacing.value[contentElement.appearance.spaceAfter]
    )
    const spaceBeforeInside = computed<string>(
        () =>
            contentElement.appearance.backgroundColor &&
            spacing.value[contentElement.appearance.spaceBeforeInside]
    )
    const spaceAfterInside = computed<string>(
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
