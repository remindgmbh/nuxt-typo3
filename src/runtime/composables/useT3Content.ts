import {
    useT3Config,
    useT3ContentInjection,
    useT3Cookiebot,
    useT3Theme,
} from '#imports'
import type { Config } from '../models'
import { computed } from 'vue'

export function useT3Content() {
    const { injectContentElement } = useT3ContentInjection()
    const contentElement = injectContentElement()
    const config = useT3Config()
    const { isAccepted } = useT3Cookiebot()
    const { backgroundColors } = useT3Theme()

    const ceOptions = computed<Config.CeOptions | undefined>(
        () =>
            config.contentElements[
                contentElement.value.type as keyof typeof config.contentElements
            ],
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
        [`container--${maxWidth.value}`]:
            !!maxWidth.value && width.value !== 'full',
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
        spaceAfter,
        spaceAfterInside,
        spaceBefore,
        spaceBeforeInside,
    }
}
