import { computed } from 'vue'
import * as T3Model from '../models'
import { Color } from '../../module'
import { useT3Config, useT3Cookiebot, useT3Theme } from '#imports'

export function useT3ContentUtil(
    contentElement: T3Model.Typo3.Content.Element
) {
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { colors } = useT3Theme()

    const backgroundColor = computed<Color | undefined>(() => {
        const [colorName, variant] =
            contentElement.appearance.backgroundColor.split('.')
        return colors.value[colorName]?.[variant ?? 'base']
    })

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
        backgroundColor,
        ignoreCookies,
        isFullWidth,
        spaceBefore,
        spaceAfter,
        spaceBeforeInside,
        spaceAfterInside,
    }
}
