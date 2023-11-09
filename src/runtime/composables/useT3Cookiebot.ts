import * as T3Model from '../models'
import { useState } from '#imports'

export function useT3Cookiebot() {
    const cookieCategories = useState<
        Omit<
            { [key in T3Model.Typo3.Content.Cookie['category']]: boolean },
            'none'
        >
    >('t3-cookies', () => ({
        necessary: false,
        marketing: false,
        preferences: false,
        statistics: false,
    }))

    function isAccepted(
        category: T3Model.Typo3.Content.Cookie['category'],
    ): boolean {
        return category === 'none' || cookieCategories.value[category]
    }

    function showBanner(): void {
        window.Cookiebot?.renew()
    }

    function acceptCookies(
        category: Omit<T3Model.Typo3.Content.Cookie['category'], 'none'>,
    ): void {
        window.Cookiebot?.submitCustomConsent(
            category === 'preferences' || window.Cookiebot.consent.preferences,
            category === 'statistics' || window.Cookiebot.consent.statistics,
            category === 'marketing' || window.Cookiebot.consent.marketing,
        )
    }

    return {
        cookieCategories,
        acceptCookies,
        isAccepted,
        showBanner,
    }
}
