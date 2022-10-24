import { defineNuxtPlugin, useCookie, useHead } from '#app'
import { useT3Config, useT3Cookiebot } from '#nuxt-typo3'

interface CookieConsent {
    stamp: string
    necessary: boolean
    preferences: boolean
    statistics: boolean
    marketing: boolean
    ver: number
    utc: number
    region: string
}

export default defineNuxtPlugin((nuxt) => {
    const config = useT3Config()

    if (!config.cookiebotUid) {
        return
    }

    const { cookieCategories } = useT3Cookiebot()

    setCookieCategories()

    nuxt.hook('app:beforeMount', () => {
        window.addEventListener('CookiebotOnAccept', setCookieCategories)
        window.addEventListener('CookiebotOnDecline', setCookieCategories)
    })

    useHead({
        script: [
            {
                src: 'https://consent.cookiebot.com/uc.js',
                'data-cbid': config.cookiebotUid,
                type: 'text/javascript',
                id: 'Cookiebot',
            },
        ],
    })

    function setCookieCategories() {
        const cookieConsent = useCookie<CookieConsent>('CookieConsent', {
            decode: (value) =>
                // use regex from https://www.cookiebot.com/en/developer/ (Server side usage - PHP)
                JSON.parse(
                    decodeURIComponent(value)
                        .replaceAll("'", '"')
                        .replaceAll(/([{[,])\s*([a-zA-Z0-9_]+?):/g, '$1"$2":')
                ),
        })

        if (cookieConsent.value) {
            cookieCategories.value.necessary = cookieConsent.value.necessary
            cookieCategories.value.marketing = cookieConsent.value.marketing
            cookieCategories.value.preferences = cookieConsent.value.preferences
            cookieCategories.value.statistics = cookieConsent.value.statistics
        }
    }
})
