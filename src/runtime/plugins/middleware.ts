import { i18n } from './i18n'
import {
    addRouteMiddleware,
    defineNuxtPlugin,
    T3Api,
    useT3ApiData,
    useT3LoadingState,
} from '#imports'

export default defineNuxtPlugin(() => {
    const apiData = useT3ApiData()
    const { loadingData, loadingPage } = useT3LoadingState()
    const { locale } = i18n.global

    addRouteMiddleware(
        'global',
        async (to, from) => {
            if (from.path === to.path) {
                loadingData.value = true
            } else {
                loadingPage.value = true
            }
            const promises: Array<Promise<any>> = [
                apiData.loadInitialData(to.fullPath),
                apiData.loadFooterContent(to.fullPath),
            ]

            if (to.name === 'T3Page') {
                promises.push(apiData.loadPageData(to.fullPath))
            }

            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [initialData, footerContent, pageData]: [
                    T3Api.InitialData?,
                    T3Api.ContentElement<any>?,
                    T3Api.PageData?,
                    ...unknown[]
                ] = await Promise.all(promises)

                setLocale(
                    to.name === 'T3Page' ? pageData?.i18n : initialData?.i18n
                )
            } finally {
                loadingData.value = false
                loadingPage.value = false
            }
        },
        { global: true }
    )

    function setLocale(languages: T3Api.Language[] = []) {
        const language = languages.find((language) => language.active)

        if (language?.twoLetterIsoCode) {
            locale.value = language.twoLetterIsoCode as any
        }
    }
})
