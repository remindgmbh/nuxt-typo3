import { useRuntimeConfig } from '#app'

export const useTypo3ApiUrl = () =>
    useRuntimeConfig().public.typo3.apiBase as string
