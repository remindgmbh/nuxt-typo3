import {
    type T3Model,
    defineNuxtRouteMiddleware,
    navigateTo,
    useT3Data,
    useT3I18n,
    useT3LoadingState,
} from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const i18n = useT3I18n()
    const loadingState = useT3LoadingState()
    const data = useT3Data()

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
            (T3Model.Typo3.Page | T3Model.Typo3.Redirect)?,
            ...unknown[],
        ] = await Promise.all(promises)

        if (pageData && isRedirect(pageData)) {
            return navigateTo(pageData.redirectUrl, {
                external: pageData.statusCode !== 307,
            })
        }

        const languages =
            to.name === 'T3Page' ? pageData?.i18n : initialData?.i18n

        if (languages) {
            const language = languages.find((language) => language.active)

            if (language?.twoLetterIsoCode) {
                // cast to any required because only 'de' and 'en' are allowed due to config in useT3I18n
                i18n.global.locale.value = language.twoLetterIsoCode as any
            }
        }
    } finally {
        loadingState.value = {}
    }
})

function isRedirect(
    page: T3Model.Typo3.Page | T3Model.Typo3.Redirect,
): page is T3Model.Typo3.Redirect {
    return (page as T3Model.Typo3.Redirect).redirectUrl !== undefined
}
