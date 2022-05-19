import { useRuntimeConfig } from '#app'

export const isFullWidth = (type: string) => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.typo3.contentElements[type]?.fullWidth
}
