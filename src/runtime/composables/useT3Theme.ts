import { computed, Ref } from 'vue'
import * as T3Model from '../models'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { themes, defaultTheme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        'theme',
        () => defaultTheme
    )

    const themeOptions = computed<T3Model.Config.ThemeOptions | undefined>(
        () => themes[selectedTheme.value]
    )

    return {
        selectedTheme,
        themeOptions,
    }
}
