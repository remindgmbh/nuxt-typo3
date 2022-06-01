import { useRuntimeConfig } from '#app'

export function useContentHelper() {
    const runtimeConfig = useRuntimeConfig()

    function isFullWidth(type: string) {
        return runtimeConfig.public.typo3.contentElements[type]?.fullWidth
    }

    return {
        isFullWidth,
    }
}
