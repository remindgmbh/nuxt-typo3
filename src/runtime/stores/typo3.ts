import { Ref, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { InitialData, Language } from '../api'

export const useTypo3Store = defineStore('typo3', () => {
    const initialData: Ref<InitialData> = ref({
        navigation: [],
        i18n: [],
    })

    function setInitialData(data: InitialData) {
        initialData.value = data
    }
    function setLanguages(languages: Language[]) {
        initialData.value.i18n = languages
    }

    const activeLanguage = computed(() =>
        initialData.value.i18n.find((language) => language.active)
    )

    const languages = computed(() => initialData.value.i18n)
    const rootPageNavigation = computed(() =>
        initialData.value.navigation.at(0)
    )
    return {
        activeLanguage,
        initialData,
        languages,
        rootPageNavigation,
        setInitialData,
        setLanguages,
    }
})
