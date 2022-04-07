import { InitialData } from 'src/api'

export const useInitialData = () => {
    const path = useCurrentPath()
    console.log('initialData', path)
    return useTypo3Api_(path, { type: '834' }) as Promise<InitialData>
}
