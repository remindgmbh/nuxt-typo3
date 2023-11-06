import { defu } from 'defu'
import { computed, Ref } from 'vue'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { theme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        't3-theme',
        () => theme.default
    )

    const backgroundColors = computed<{ [name: string]: string }>(() =>
        defu(
            theme.backgroundColors[selectedTheme.value],
            theme.backgroundColors[theme.default] ?? {}
        )
    )

    return {
        backgroundColors,
        defaultTheme: theme.default,
        selectedTheme,
    }
}
