import { useRoute, useRuntimeConfig, useState } from '#app'
import { computed } from 'vue'
import { useTypo3Fetch } from './useTypo3Fetch'
import { InitialData, Language } from '#nuxt-typo3/api'

export function useInitialData() {
    const { $typo3Fetch } = useTypo3Fetch()
    const runtimeConfig = useRuntimeConfig()

    const initialData = useState<InitialData>('initialData', () => ({
        i18n: [],
        navigation: [],
    }))

    const pageLanguages = useState<Language[]>('languages', () => [])

    const rootLanguages = computed(() => initialData.value.i18n)

    const activeLanguage = computed(() =>
        languages.value.find((language) => language.active)
    )

    const languages = computed(() =>
        pageLanguages.value.map((pageLanguage) => {
            if (pageLanguage.available) {
                return pageLanguage
            } else {
                return (
                    rootLanguages.value.find(
                        (rootLanguage) =>
                            rootLanguage.languageId === pageLanguage.languageId
                    ) ?? pageLanguage
                )
            }
        })
    )

    const rootPageNavigation = computed(() =>
        initialData.value.navigation.at(0)
    )

    async function updateInitialData() {
        const value = await getInitialData()
        initialData.value = value
        pageLanguages.value = value.i18n
    }

    function setLanguages(value: Language[]) {
        pageLanguages.value = value
    }

    async function getInitialData(): Promise<InitialData> {
        const path = getLocalizedRootPath()

        return await $typo3Fetch<InitialData>({
            path,
            params: { type: runtimeConfig.public.typo3.api.initialDataType },
        })
    }

    function getLocalizedRootPath() {
        const fullPath = useRoute().fullPath

        return (
            runtimeConfig.public.typo3.languages.find(
                (languagePath) =>
                    fullPath.startsWith(languagePath) ||
                    fullPath === languagePath.slice(0, -1)
            ) ?? '/'
        )
    }

    return {
        activeLanguage,
        languages,
        rootPageNavigation,
        setLanguages,
        updateInitialData,
    }
}
