import { createI18n } from 'vue-i18n'
import de from '../locales/de'
import en from '../locales/en'

const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'de',
    messages: {
        de,
        en,
    },
})

export default function useT3I18n() {
    return i18n
}
