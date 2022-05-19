import { useRuntimeConfig } from '#app'
import { useTypo3Fetch } from './useTypo3Fetch'
import { InitialData } from '#nuxt-typo3/api'

export const useInitialData = () => {
    const runtimeConfig = useRuntimeConfig()
    const { $typo3Fetch } = useTypo3Fetch()
    return $typo3Fetch<InitialData>({
        params: { type: runtimeConfig.public.typo3.api.initialDataType },
    })
}
