export const useCurrentPath = () => {
    const route = useRoute()
    return route.fullPath || route.path
}
