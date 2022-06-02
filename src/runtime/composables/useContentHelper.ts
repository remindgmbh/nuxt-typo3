import { useConfig } from '#nuxt-typo3'

export function useContentHelper() {
    const config = useConfig()

    function isFullWidth(type: string) {
        return config.contentElements[type]?.fullWidth
    }

    return {
        isFullWidth,
    }
}
