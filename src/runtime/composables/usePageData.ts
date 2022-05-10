import { PageData } from '../api'
import { useTypo3Fetch } from './useTypo3Fetch'

export const usePageData = () => {
    const { typo3Fetch } = useTypo3Fetch()
    return typo3Fetch<PageData>()
}
