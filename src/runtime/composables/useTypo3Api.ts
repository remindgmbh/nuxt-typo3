import { SearchParams } from 'ohmyfetch'

export const useTypo3Api = (path: string, params?: SearchParams) => {
    const baseURL = useTypo3ApiUrl()
    return useFetch(path, { baseURL, params })
}

export function useTypo3Api_(path: string, params?: SearchParams) {
    const baseURL = useTypo3ApiUrl()
    return $fetch(path, { baseURL, params })
}
