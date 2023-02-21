import { computed } from 'vue'
import { useRoute } from '#app'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'

export function useT3ApiPath() {
    const config = useT3Config()

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
