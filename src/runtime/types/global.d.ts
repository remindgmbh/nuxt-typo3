import type { useLogger as _useLogger } from '@remindgmbh/nuxt-logger/dist/runtime/useLogger'
interface Cookiebot {
    consent: {
        marketing: boolean
        necessary: boolean
        preferences: boolean
        statistics: boolean
    }
    consented: boolean
    declined: boolean
    hasResponse: boolean
    doNotTrack: boolean
    regulations: {
        gdprApplies: boolean
        ccpaApplies: boolean
        lgpdApplies: boolean
    }
    show: () => void
    hide: () => void
    renew: () => void
    getScript: (url: string, async: boolean, callback: () => void) => void
    runScripts: () => void
    withdraw: () => void
    submitCustomConsent: (
        optinPreferences: boolean,
        optinStatistics: boolean,
        optinMarketing: boolean
    ) => void
}

declare global {
    interface Window {
        Cookiebot?: Cookiebot
    }

    const useLogger: typeof _useLogger
}

export {}
