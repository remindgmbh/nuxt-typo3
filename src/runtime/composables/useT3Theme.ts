import { computed, Ref } from 'vue'
import { Color } from '../../module'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { theme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        'theme',
        () => theme.default
    )

    const colors = computed<{ [colorName: string]: Color }>(
        () => theme.themes[selectedTheme.value]
    )

    return {
        colors,
        selectedTheme,
    }
}
