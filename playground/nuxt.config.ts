import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'
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
        },
        i18n: {
            messages: {
                de,
                en,
            },
        },
        languages: ['/de/'],
    },
    modules: [MyModule],
})
