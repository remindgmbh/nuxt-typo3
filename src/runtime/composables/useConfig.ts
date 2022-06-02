import { useRuntimeConfig } from '#app'

export function useConfig() {
    return useRuntimeConfig().public.typo3
}
