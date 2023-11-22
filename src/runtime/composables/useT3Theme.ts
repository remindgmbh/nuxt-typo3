import { defu } from 'defu'
import { computed, type Ref } from 'vue'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { theme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        't3-theme',
        () => theme.default,
    )

    const backgroundColors = computed<{ [name: string]: string }>(() =>
        defu(
            theme.backgroundColors[
                selectedTheme.value as keyof typeof theme.backgroundColors
            ],
            theme.backgroundColors[
                theme.default as keyof typeof theme.backgroundColors
            ] ?? {},
        ),
    )

    return {
        backgroundColors,
        defaultTheme: theme.default as string,
        selectedTheme,
    }
}
