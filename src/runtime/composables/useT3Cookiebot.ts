import { useState } from '#app'
import { T3Api } from '#nuxt-typo3'

export function useT3Cookiebot() {
    const cookieCategories = useState<
        Omit<{ [key in T3Api.Cookie['category']]: boolean }, 'none'>
    >(() => ({
        necessary: false,
        marketing: false,
        preferences: false,
        statistics: false,
    }))

    function isAccepted(category: T3Api.Cookie['category']): boolean {
        return category === 'none' || cookieCategories.value[category]
    }

    function showBanner(): void {
        window.Cookiebot?.renew()
    }

    function acceptCookies(
        category: Omit<T3Api.Cookie['category'], 'none'>
    ): void {
        window.Cookiebot?.submitCustomConsent(
            category === 'preferences' || window.Cookiebot.consent.preferences,
            category === 'statistics' || window.Cookiebot.consent.statistics,
            category === 'marketing' || window.Cookiebot.consent.marketing
        )
    }

    return {
        cookieCategories,
        acceptCookies,
        isAccepted,
        showBanner,
    }
}
