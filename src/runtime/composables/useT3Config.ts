import { useRuntimeConfig } from '#app'

export function useT3Config() {
    return useRuntimeConfig().public.typo3
}
