import { computed } from 'vue'
import { useRoute, useT3Config } from '#imports'

export function useT3ApiPath() {
    const config = useT3Config()

    function getInitialDataPath(path: string): string {
        return (
            config.languages.find(
                (languagePath) =>
                    path.startsWith(languagePath) ||
                    path === languagePath.slice(0, -1)
            ) ?? '/'
        )
    }

    const currentPagePath = computed<string>(() => useRoute().fullPath)

    const currentInitialDataPath = computed<string>(() =>
        getInitialDataPath(currentPagePath.value)
    )

    return {
        currentInitialDataPath,
        currentPagePath,
        getInitialDataPath,
    }
}
