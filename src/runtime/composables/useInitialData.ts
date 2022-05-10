import { useRuntimeConfig } from '#app'
import { InitialData } from '../api'
import { useTypo3Fetch } from './useTypo3Fetch'

export const useInitialData = () => {
    const runtimeConfig = useRuntimeConfig()
    const { $typo3Fetch } = useTypo3Fetch()
    return $typo3Fetch<InitialData>({
        params: { type: runtimeConfig.public.typo3.api.initialDataType },
    })
}
