import { useTypo3Fetch } from './useTypo3Fetch'
import { PageData } from '#nuxt-typo3/api'

export const usePageData = () => {
    const { typo3Fetch } = useTypo3Fetch()
    return typo3Fetch<PageData>()
}
