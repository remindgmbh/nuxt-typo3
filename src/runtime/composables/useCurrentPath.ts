import { useRoute } from '#app'

export const useCurrentPath: () => string = () => {
    const route = useRoute()
    return route.fullPath || route.path
}
