import { addRouteMiddleware, defineNuxtPlugin } from '#app'
import { useApiData, useI18n } from '#nuxt-typo3'

export default defineNuxtPlugin((nuxt) => {
    const apiData = useApiData()
    const { locale } = useI18n(nuxt)

    addRouteMiddleware(
        'global',
        async (to) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [initialData, pageData] = await apiData.loadAllData(
                to.fullPath
            )

            const language = pageData?.i18n.find((language) => language.active)

            if (language?.twoLetterIsoCode) {
                locale.value = language.twoLetterIsoCode
            }
        },
        { global: true }
    )
})
