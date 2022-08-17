import { useState } from '#app'
import { Api } from '#nuxt-typo3'

export function useCookiebot() {
    const cookieCategories = useState<
        Omit<{ [key in Api.Cookie['category']]: boolean }, 'none'>
    >(() => ({
        necessary: false,
        marketing: false,
        preferences: false,
        statistics: false,
    }))

    function isAccepted(category: Api.Cookie['category']) {
        return category === 'none' || cookieCategories.value[category]
    }

    function showBanner() {
        window.Cookiebot?.renew()
    }

    function acceptCookies(category: Omit<Api.Cookie['category'], 'none'>) {
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
