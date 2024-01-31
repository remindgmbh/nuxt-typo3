import {
    T3Model,
    defineNuxtRouteMiddleware,
    useT3Data,
    useT3LoadingState,
} from '#imports'
import { i18n } from '../plugins/i18n'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const loadingState = useT3LoadingState()
    const data = useT3Data()
    const { locale } = i18n.global

    loadingState.value.type = from.path === to.path ? 'data' : 'page'
    loadingState.value.from = from
    loadingState.value.to = to
    const promises: Array<Promise<any>> = [data.loadInitialData(to.fullPath)]

    if (to.name === 'T3Page') {
        promises.push(data.loadPageData(to.fullPath))
    }

    try {
        const [initialData, pageData]: [
            T3Model.Typo3.InitialData?,
            T3Model.Typo3.Page.Data?,
            ...unknown[],
        ] = await Promise.all(promises)

        const languages =
            to.name === 'T3Page' ? pageData?.i18n : initialData?.i18n

        if (languages) {
            const language = languages.find((language) => language.active)

            if (language?.twoLetterIsoCode) {
                locale.value = language.twoLetterIsoCode as any
            }
        }
    } finally {
        loadingState.value = {}
    }
})
