import { InitialData } from '../api'
import { useCurrentPath } from './useCurrentPath'
import { useTypo3Api_ } from './useTypo3Api'

export const useInitialData = () => {
    const path = useCurrentPath()
    console.log('initialData', path)
    return useTypo3Api_(path, { type: '834' }) as Promise<InitialData>
}
