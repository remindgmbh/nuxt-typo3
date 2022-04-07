import { AsyncData } from 'nuxt/dist/app'
import { PageData } from 'src/api'

export const usePageData = () => {
    const path = useCurrentPath()
    console.log('pageData', path)
    return useTypo3Api(path) as AsyncData<PageData, any>
}
