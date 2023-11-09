import { computed } from 'vue'
import { useT3Config, useT3Cookiebot, useT3Content, useT3Theme } from '#imports'

export function useT3ContentUtil() {
    const { injectContentElement } = useT3Content()
    const contentElement = injectContentElement()
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { backgroundColors } = useT3Theme()

    const ceOptions = computed(
        () => config.contentElements[contentElement.value.type],
    )

    const backgroundColorName = computed<string>(
        () => contentElement.value.appearance.backgroundColor,
    )

    const backgroundColorValue = computed<string | undefined>(
        () => backgroundColors.value?.[backgroundColorName.value],
    )

    const backgroundFullWidth = computed<boolean>(
        () => !!contentElement.value.appearance.backgroundFullWidth,
    )

    const containerClasses = computed(() => ({
        container: width.value !== 'full',
        'container--extended': width.value === 'extended',
        [`container--${maxWidth.value}`]: !!maxWidth.value,
    }))

    const cookieAccepted = computed<boolean>(() =>
        isAccepted(contentElement.value.cookie.category),
    )

    const ignoreCookies = computed<boolean>(() =>
        ceOptions.value?.ignoreCookies instanceof Function
            ? ceOptions.value.ignoreCookies(contentElement.value)
            : ceOptions.value?.ignoreCookies ?? false,
    )

    const maxWidth = computed<string | undefined>(() => {
        return ceOptions.value?.maxWidth instanceof Function
            ? ceOptions.value.maxWidth(contentElement.value)
            : ceOptions.value?.maxWidth
    })

    const padding = computed<boolean>(() =>
        ceOptions.value?.padding instanceof Function
            ? ceOptions.value?.padding(contentElement.value)
            : ceOptions.value?.padding ?? true,
    )

    const spaceBefore = computed<string>(
        () => config.spacing[contentElement.value.appearance.spaceBefore],
    )
    const spaceAfter = computed<string>(
        () => config.spacing[contentElement.value.appearance.spaceAfter],
    )
    const spaceBeforeInside = computed<string>(
        () =>
            backgroundColorName.value &&
            config.spacing[contentElement.value.appearance.spaceBeforeInside],
    )
    const spaceAfterInside = computed<string>(
        () =>
            backgroundColorName.value &&
            config.spacing[contentElement.value.appearance.spaceAfterInside],
    )

    const width = computed<'default' | 'extended' | 'full'>(() =>
        ceOptions.value?.width instanceof Function
            ? ceOptions.value?.width(contentElement.value)
            : ceOptions.value?.width ?? 'default',
    )

    return {
        backgroundColorName,
        backgroundColorValue,
        backgroundFullWidth,
        containerClasses,
        cookieAccepted,
        ignoreCookies,
        padding,
        spaceBefore,
        spaceAfter,
        spaceBeforeInside,
        spaceAfterInside,
    }
}
