import { defu } from 'defu'
import { computed } from 'vue'
import { useT3ContentInjection, useT3Theme } from '#imports'

export function useT3ColorScheme<T>(
    colorSchemes: { [theme: string]: T },
    backgroundColor?: string,
) {
    const { injectOptionalContentElement } = useT3ContentInjection()

    const contentElement = injectOptionalContentElement()

    backgroundColor ??= contentElement?.value.appearance.backgroundColor

    const { defaultTheme, selectedTheme } = useT3Theme()

    function getKey(theme: string) {
        return [theme, backgroundColor].filter((value) => value).join('/')
    }

    const result = computed(() => {
        const defaultThemeAndBackground = getKey(defaultTheme)
        const selectedThemeAndBackground = getKey(selectedTheme.value)

        return defu(
            colorSchemes[selectedThemeAndBackground] as any,
            colorSchemes[selectedTheme.value] as any,
            colorSchemes[defaultThemeAndBackground] as any,
            colorSchemes[defaultTheme] as any,
        ) as T
    })

    return result
}
