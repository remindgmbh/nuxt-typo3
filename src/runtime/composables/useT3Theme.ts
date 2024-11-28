import { type Ref, computed } from 'vue'
import { useAppConfig, useState } from '#imports'
import { defu } from 'defu'

export function useT3Theme() {
    const { typo3: config } = useAppConfig()

    const selectedTheme: Ref<string> = useState<string>(
        't3-theme',
        () => config.theme.default,
    )

    const backgroundColors = computed<{ [name: string]: string }>(() =>
        defu(
            config.theme.backgroundColors[
                selectedTheme.value as keyof typeof config.theme.backgroundColors
            ],
            config.theme.backgroundColors[
                config.theme
                    .default as keyof typeof config.theme.backgroundColors
            ] ?? {},
        ),
    )

    return {
        backgroundColors,
        defaultTheme: config.theme.default as string,
        selectedTheme,
    }
}
