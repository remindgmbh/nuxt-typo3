import { defineNuxtPlugin } from '#app'
import { useInitialData } from '#nuxt-typo3/composables/useInitialData'

export default defineNuxtPlugin(async (_nuxt) => {
    const { updateInitialData } = useInitialData()
    await updateInitialData()
})
