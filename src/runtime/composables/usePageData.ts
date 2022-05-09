import { AsyncData } from '#app'
import { PageData } from '../api'
import { useCurrentPath } from './useCurrentPath'
import { useTypo3Api } from './useTypo3Api'

export const usePageData = () => {
    const path = useCurrentPath()
    console.log('pageData', path)
    return useTypo3Api(path) as AsyncData<PageData, any>
}
