import { Ref } from 'vue'
import { defineStore } from 'pinia'
import { InitialData, Language } from 'src/api'

export const useTypo3Store = defineStore('typo3', () => {
    // const navigation: Ref<NavItem[]> = ref([])
    // const languages: Ref<Language[]> = ref([])

    const initialData: Ref<InitialData> = ref({
        navigation: [],
        i18n: [],
    })

    function setInitialData(data: InitialData) {
        initialData.value = data
        // navigation.value = data.navigation
        // languages.value = data.i18n
    }
    function setLanguages(languages: Language[]) {
        initialData.value.i18n = languages
    }

    const activeLanguage = computed(() =>
        initialData.value.i18n.find((language) => language.active)
    )

    const languages = computed(() => initialData.value.i18n)
    const navigation = computed(() => initialData.value.navigation)
    // const navItemRoot = computed(() => initialData.value.navigation[0])
    // const navItems = computed(() => navItemRoot.value?.children)

    return {
        activeLanguage,
        initialData,
        languages,
        navigation,
        // navItemRoot,
        // navItems,
        setInitialData,
        setLanguages,
    }
})
