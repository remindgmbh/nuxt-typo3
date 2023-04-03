import { useState } from '#app'
import { computed } from 'vue'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'

export function useT3Theme() {
    const { theme } = useT3Config()

    const selectedTheme = useState<string>('theme', () => theme.default)

    const colors = computed(() => theme.themes[selectedTheme.value].colors)

    const spacing = computed(() => theme.themes[selectedTheme.value].spacing)

    return {
        colors,
        selectedTheme,
        spacing,
    }
}
