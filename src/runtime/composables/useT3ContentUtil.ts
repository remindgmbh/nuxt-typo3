import { computed } from 'vue'
import * as T3Api from '../api'
import { Color } from '../../module'
import { useT3Config, useT3Cookiebot, useT3Theme } from '#imports'

export function useT3ContentUtil(contentElement: T3Api.ContentElement) {
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { colors } = useT3Theme()

    const color = computed<Color>(
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
        () => config.spacing[contentElement.appearance.spaceBefore]
    )
    const spaceAfter = computed<string>(
        () => config.spacing[contentElement.appearance.spaceAfter]
    )
    const spaceBeforeInside = computed<string>(
        () =>
            contentElement.appearance.backgroundColor &&
            config.spacing[contentElement.appearance.spaceBeforeInside]
    )
    const spaceAfterInside = computed<string>(
        () =>
            contentElement.appearance.backgroundColor &&
            config.spacing[contentElement.appearance.spaceAfterInside]
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
