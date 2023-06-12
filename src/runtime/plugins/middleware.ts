import { i18n } from './i18n'
import {
    addRouteMiddleware,
    defineNuxtPlugin,
    T3Model,
    useT3ApiData,
    useT3LoadingState,
} from '#imports'

export default defineNuxtPlugin(() => {
    const apiData = useT3ApiData()
    const loadingState = useT3LoadingState()
    const { locale } = i18n.global

    addRouteMiddleware(
        'global',
        async (to, from) => {
            loadingState.value.type = from.path === to.path ? 'data' : 'page'
            loadingState.value.from = from
            loadingState.value.to = to
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
                    T3Model.Typo3.InitialData?,
                    T3Model.Typo3.Content.Element<any>?,
                    T3Model.Typo3.Page.Data?,
                    ...unknown[]
                ] = await Promise.all(promises)

                setLocale(
                    to.name === 'T3Page' ? pageData?.i18n : initialData?.i18n
                )
            } finally {
                loadingState.value = {}
            }
        },
        { global: true }
    )

    function setLocale(languages: T3Model.Typo3.Language[] = []) {
        const language = languages.find((language) => language.active)

        if (language?.twoLetterIsoCode) {
            locale.value = language.twoLetterIsoCode as any
        }
    }
})
