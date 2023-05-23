import { computed } from 'vue'
import { defu } from 'defu'
import * as T3Model from '../models'
import { useT3Config, useT3Cookiebot, useT3Theme } from '#imports'

export function useT3ContentUtil(
    contentElement: T3Model.Typo3.Content.Element
) {
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { themeOptions } = useT3Theme()

    const backgroundColor = computed<string | undefined>(() => {
        return themeOptions.value.backgroundColors[
            contentElement.appearance.backgroundColor
        ]
    })

    const colors = computed<{ [color: string]: string } | undefined>(() => {
        const defaultColors =
            themeOptions.value.contentElements[contentElement.type].default

        if (backgroundColor.value) {
            return defu(
                themeOptions.value.contentElements[contentElement.type]
                    .backgroundColors[backgroundColor.value],
                defaultColors
            )
        } else {
            return defaultColors
        }
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
        backgroundColor,
        colors,
        cookieAccepted,
        ignoreCookies,
        isFullWidth,
        spaceBefore,
        spaceAfter,
        spaceBeforeInside,
        spaceAfterInside,
    }
}
