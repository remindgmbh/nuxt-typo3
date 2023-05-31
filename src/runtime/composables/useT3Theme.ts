import { computed, Ref } from 'vue'
import { ThemeOptions } from '../../module'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { themes, defaultTheme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        'theme',
        () => defaultTheme
    )

    const themeOptions = computed<ThemeOptions | undefined>(
        () => themes[selectedTheme.value]
    )

    return {
        selectedTheme,
        themeOptions,
    }
}
