import { addRouteMiddleware, defineNuxtPlugin } from '#app'
import { i18n } from './i18n'
import { Api, useApiData } from '#nuxt-typo3'

export default defineNuxtPlugin(() => {
    const apiData = useApiData()
    const { locale } = i18n.global

    addRouteMiddleware(
        'global',
        async (to) => {
            const initialData = await apiData.loadInitialData(to.fullPath)
            await apiData.loadFooterContent(to.fullPath)

            if (to.name === 'T3Page') {
                const pageData = await apiData.loadPageData(to.fullPath)
                setLocale(pageData?.i18n)
            } else {
                setLocale(initialData?.i18n)
            }
        },
        { global: true }
    )

    function setLocale(languages: Api.Language[] = []) {
        const language = languages.find((language) => language.active)

        if (language?.twoLetterIsoCode) {
            locale.value = language.twoLetterIsoCode as any
        }
    }
})
