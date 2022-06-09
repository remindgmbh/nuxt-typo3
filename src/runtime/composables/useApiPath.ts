import { computed } from 'vue'
import { useRoute } from '#app'
import { useConfig } from '#nuxt-typo3'

export function useApiPath() {
    const config = useConfig()

    function getInitialDataPath(path: string) {
        return (
            config.languages.find(
                (languagePath) =>
                    path.startsWith(languagePath) ||
                    path === languagePath.slice(0, -1)
            ) ?? '/'
        )
    }

    const currentPagePath = computed(() => useRoute().fullPath)

    const currentInitialDataPath = computed(() =>
        getInitialDataPath(currentPagePath.value)
    )

    return {
        currentInitialDataPath,
        currentPagePath,
        getInitialDataPath,
    }
}
