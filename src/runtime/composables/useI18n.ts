import { NuxtApp } from '#app'
import { Composer, I18nOptions } from 'vue-i18n'

// TODO update once @nuxtjs/i18n for nuxt3 is released
// https://github.com/nuxt-community/i18n-module/issues/1410
export function useI18n(nuxt: NuxtApp) {
    const vueApp = nuxt.vueApp as any
    return vueApp.__VUE_I18N__.global as Composer<
        NonNullable<I18nOptions['messages']>,
        NonNullable<I18nOptions['datetimeFormats']>,
        NonNullable<I18nOptions['numberFormats']>,
        NonNullable<I18nOptions['locale']>
    >
}
