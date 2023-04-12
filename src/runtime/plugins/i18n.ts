import { createI18n } from 'vue-i18n'
import de from '../locales/de'
import en from '../locales/en'
import { defineNuxtPlugin, useT3Config } from '#imports'

export interface MessageContext {
    named: (value: string) => string
    linked: (value: string) => string
}

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
    const config = useT3Config()
    const { vueApp } = nuxt
    const { mergeLocaleMessage } = i18n.global

    if (config.i18n.messages) {
        for (const locale of Object.keys(config.i18n.messages)) {
            mergeLocaleMessage(locale, config.i18n.messages[locale])
        }
    }

    vueApp.use(i18n)
})
