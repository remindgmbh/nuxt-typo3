import { addRouteMiddleware, defineNuxtPlugin } from '#app'
import { i18n } from './i18n'
import { useApiData } from '#nuxt-typo3'

export default defineNuxtPlugin(() => {
    const apiData = useApiData()
    const { locale } = i18n.global

    addRouteMiddleware(
        'global',
        async (to) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [footerContent, initialData, pageData] =
                await apiData.loadAllData(to.fullPath)

            const language = pageData?.i18n.find((language) => language.active)

            if (language?.twoLetterIsoCode) {
                locale.value = language.twoLetterIsoCode as any
            }
        },
        { global: true }
    )
})
