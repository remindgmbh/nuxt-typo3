import { computed } from 'vue'
import { useApiData } from '#nuxt-typo3'

export function useLanguages() {
    const { currentInitialData, currentPageData } = useApiData()

    const initialDataLanguages = computed(
        () => currentInitialData.value?.i18n ?? []
    )

    const pageDataLanguages = computed(() => currentPageData.value?.i18n ?? [])

    const availableLanguages = computed(() =>
        // page languages may be empty if error occured
        pageDataLanguages.value.length > 0
            ? pageDataLanguages.value.map((pageDataLanguage) => {
                  if (pageDataLanguage.available) {
                      return pageDataLanguage
                  } else {
                      // if current page doesn't exist in selected language show link to root page
                      return (
                          initialDataLanguages.value.find(
                              (initialDataLanguage) =>
                                  initialDataLanguage.languageId ===
                                  pageDataLanguage.languageId
                          ) ?? pageDataLanguage
                      )
                  }
              })
            : initialDataLanguages.value
    )

    const activeLanguage = computed(() =>
        availableLanguages.value.find((language) => language.active)
    )

    return {
        activeLanguage,
        availableLanguages,
    }
}
