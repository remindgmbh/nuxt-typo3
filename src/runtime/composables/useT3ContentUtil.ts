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

    const ceOptions = computed(
        () => config.contentElements[contentElement.type]
    )

    const backgroundColor = computed<string | undefined>(
        () =>
            themeOptions.value?.backgroundColors?.[
                contentElement.appearance.backgroundColor
            ]
    )

    const backgroundFullWidth = computed<boolean>(
        () => !!contentElement.appearance.backgroundFullWidth
    )

    const colors = computed<any | undefined>(() => {
        const defaultColors =
            themeOptions.value?.contentElements?.[contentElement.type]
                ?.default ?? {}

        if (backgroundColor.value) {
            return defu(
                themeOptions.value?.contentElements?.[contentElement.type]
                    ?.backgroundColors?.[
                    contentElement.appearance.backgroundColor
                ] ?? {},
                defaultColors
            )
        } else {
            return defaultColors
        }
    })

    const containerClasses = computed(() => ({
        container: width.value !== 'full',
        'container--large': width.value === 'large',
        [`container--max-width-${maxWidth.value}`]: !!maxWidth.value,
    }))

    const cookieAccepted = computed<boolean>(() =>
        isAccepted(contentElement.cookie.category)
    )

    const ignoreCookies = computed<boolean>(() =>
        ceOptions.value?.ignoreCookies instanceof Function
            ? ceOptions.value.ignoreCookies(contentElement)
            : ceOptions.value?.ignoreCookies ?? false
    )

    const maxWidth = computed<string | undefined>(() => {
        return ceOptions.value?.maxWidth instanceof Function
            ? ceOptions.value.maxWidth(contentElement)
            : ceOptions.value?.maxWidth
    })

    const padding = computed<boolean>(() =>
        ceOptions.value?.padding instanceof Function
            ? ceOptions.value?.padding(contentElement)
            : ceOptions.value?.padding ?? true
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

    const width = computed<'default' | 'large' | 'full'>(() =>
        ceOptions.value?.width instanceof Function
            ? ceOptions.value?.width(contentElement)
            : ceOptions.value?.width ?? 'default'
    )

    return {
        backgroundColor,
        backgroundFullWidth,
        colors,
        containerClasses,
        cookieAccepted,
        ignoreCookies,
        maxWidth,
        padding,
        spaceBefore,
        spaceAfter,
        spaceBeforeInside,
        spaceAfterInside,
        width,
    }
}
