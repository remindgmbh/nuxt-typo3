import { defineNuxtConfig } from 'nuxt'
import PageTransitionModule from './modules/pageTransition'
import de from './locales/de.json'
import en from './locales/en.json'

export default defineNuxtConfig({
    head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
    },
    runtimeConfig: {
        public: {
            typo3: {
                baseUrl: '',
                api: {
                    baseUrl: '',
                },
                cookiebotUid: '',
            },
        },
    },
    components: [
        {
            path: '@/components',
            global: true,
        },
    ],
    typescript: {
        shim: false,
        strict: true,
    },
    css: ['@/assets/base.scss'],
    typo3: {
        customCssVariables: '@/assets/variables.scss',
        contentElements: {
            header: {
                fullWidth: false,
            },
            textmedia: {
                ignoreCookies: true,
            },
        },
        i18n: {
            messages: {
                de,
                en,
            },
        },
        languages: ['/de/'],
    },
    modules: ['@remindgmbh/nuxt-typo3', PageTransitionModule],
})
