import { defineNuxtPlugin } from '#app'
import { useTypo3State } from '#nuxt-typo3/composables/useTypo3State'

export default defineNuxtPlugin(async (_nuxt) => {
    const { updateInitialData } = useTypo3State()
    await updateInitialData()
})
