import { computed } from 'vue'
import * as T3Model from '../models'
import { useT3ApiData } from '#imports'

export function useT3Languages() {
    const { currentInitialData, currentPageData } = useT3ApiData()

    const initialDataLanguages = computed<T3Model.Typo3.Language[]>(
        () => currentInitialData.value?.i18n ?? [],
    )

    const pageDataLanguages = computed<T3Model.Typo3.Language[]>(
        () => currentPageData.value?.i18n ?? [],
    )

    const availableLanguages = computed<T3Model.Typo3.Language[]>(() =>
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
                                  pageDataLanguage.languageId,
                          ) ?? pageDataLanguage
                      )
                  }
              })
            : initialDataLanguages.value,
    )

    const activeLanguage = computed<T3Model.Typo3.Language | undefined>(() =>
        availableLanguages.value.find((language) => language.active),
    )

    return {
        activeLanguage,
        availableLanguages,
    }
}
