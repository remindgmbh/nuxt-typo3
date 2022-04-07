export default defineNuxtPlugin(async (_nuxt) => {
    console.log('initialData Plugin')
    const typo3Store = useTypo3Store()
    const initialData = await useInitialData()
    typo3Store.setInitialData(initialData)
})
