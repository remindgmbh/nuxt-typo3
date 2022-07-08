import { defineNuxtPlugin } from '#app'
import { createI18n } from 'vue-i18n'
import de from '#nuxt-typo3/locales/de.json'
import en from '#nuxt-typo3/locales/en.json'
import { useConfig } from '#nuxt-typo3'

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'de',
    messages: {
        de,
        en,
    },
})

export default defineNuxtPlugin((nuxt) => {
    const config = useConfig()
    const { vueApp } = nuxt
    const { mergeLocaleMessage } = i18n.global

    if (config.i18n.messages) {
        Object.keys(config.i18n.messages).forEach((locale) =>
            mergeLocaleMessage(locale, config.i18n.messages?.[locale])
        )
    }

    vueApp.use(i18n)
})
