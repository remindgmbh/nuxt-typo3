import { type T3Model, useNuxtApp, useState } from '#imports'

export function useT3CookieConsent() {
    const nuxt = useNuxtApp()

    const cookieCategories = useState<
        Omit<
            { [key in T3Model.Typo3.Content.Cookie['category']]: boolean },
            'none'
        >
    >('t3-cookies', () => ({
        marketing: false,
        necessary: false,
        preferences: false,
        statistics: false,
    }))

    function isAccepted(
        category: T3Model.Typo3.Content.Cookie['category'],
    ): boolean {
        return category === 'none' || cookieCategories.value[category]
    }

    function showBanner(): void {
        nuxt.callHook('typo3:cookieConsent:showBanner')
    }

    function acceptCookies(
        category: Omit<T3Model.Typo3.Content.Cookie['category'], 'none'>,
    ): void {
        nuxt.callHook('typo3:cookieConsent:acceptCookies', category)
    }

    return {
        cookieCategories,

        acceptCookies,
        isAccepted,
        showBanner,
    }
}
