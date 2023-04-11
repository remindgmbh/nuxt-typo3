import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3ApiData } from '#nuxt-typo3/composables/useT3ApiData'

export function useT3Languages() {
    const { currentInitialData, currentPageData } = useT3ApiData()

    const initialDataLanguages = computed<T3Api.Language[]>(
        () => currentInitialData.value?.i18n ?? []
    )

    const pageDataLanguages = computed<T3Api.Language[]>(
        () => currentPageData.value?.i18n ?? []
    )

    const availableLanguages = computed<T3Api.Language[]>(() =>
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

    const activeLanguage = computed<T3Api.Language | undefined>(() =>
        availableLanguages.value.find((language) => language.active)
    )

    return {
        activeLanguage,
        availableLanguages,
    }
}
