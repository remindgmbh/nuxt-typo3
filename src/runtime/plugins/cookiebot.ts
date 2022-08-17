import { defineNuxtPlugin, useCookie, useHead } from '#app'
// eslint-disable-next-line import/default
import JSON5 from 'json5'
import { useConfig, useCookiebot } from '#nuxt-typo3'

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

export default defineNuxtPlugin((plugin) => {
    const config = useConfig()

    if (!config.cookiebotUid) {
        return
    }

    const { cookieCategories } = useCookiebot()

    setCookieCategories()

    plugin.hook('app:beforeMount', () => {
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
        const cookieConsent = useCookie('CookieConsent', {
            decode: (value: string) =>
                // eslint-disable-next-line import/no-named-as-default-member
                JSON5.parse<CookieConsent>(decodeURIComponent(value)),
        })

        if (cookieConsent.value) {
            cookieCategories.value.necessary = cookieConsent.value.necessary
            cookieCategories.value.marketing = cookieConsent.value.marketing
            cookieCategories.value.preferences = cookieConsent.value.preferences
            cookieCategories.value.statistics = cookieConsent.value.statistics
        }
    }
})
