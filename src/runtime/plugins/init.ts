import { addRouteMiddleware, defineNuxtPlugin } from '#app'
import { useApiData } from '#nuxt-typo3'

export default defineNuxtPlugin(() => {
    const apiData = useApiData()

    addRouteMiddleware(
        'global',
        async (to) => {
            await apiData.loadAllData(to.fullPath)
        },
        { global: true }
    )
})
