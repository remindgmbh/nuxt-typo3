import { useState } from '#app'
import { computed } from 'vue'
import { InitialData, Language } from '../api'
import { useInitialData } from './useInitialData'

export const useTypo3State = () => {
    const initialData = useState<InitialData>('initialData', () => ({
        i18n: [],
        navigation: [],
    }))

    const updateInitialData = async () => {
        const value = await useInitialData()
        initialData.value = value
    }

    const setLanguages = (languages: Language[]) =>
        (initialData.value.i18n = languages)

    const activeLanguage = computed(() =>
        initialData.value.i18n.find((language) => language.active)
    )

    const languages = computed(() => initialData.value.i18n)

    const rootPageNavigation = computed(() =>
        initialData.value.navigation.at(0)
    )

    return {
        activeLanguage,
        languages,
        initialData,
        rootPageNavigation,
        setLanguages,
        updateInitialData,
    }
}
