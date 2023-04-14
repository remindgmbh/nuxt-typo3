import { computed, Ref } from 'vue'
import { Color } from '../../module'
import { useState, useT3Config } from '#imports'

export function useT3Theme() {
    const { themes, defaultTheme } = useT3Config()

    const selectedTheme: Ref<string> = useState<string>(
        'theme',
        () => defaultTheme
    )

    const colors = computed<{ [colorName: string]: Color }>(
        () => themes[selectedTheme.value]
    )

    return {
        colors,
        selectedTheme,
    }
}
