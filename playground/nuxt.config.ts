import de from './locales/de.json'
import en from './locales/en.json'
import { themes } from './themes'

export default defineNuxtConfig({
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
    logger: {
        level: 3,
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
        contentElements: {
            header: {
                maxWidth: 'md',
                width: 'large',
            },
            text: {
                maxWidth: 'md',
            },
            textmedia: {
                maxWidth: 'lg',
                ignoreCookies: true,
                padding: false,
            },
        },
        defaultTheme: 'light',
        i18n: {
            messages: {
                de,
                en,
            },
        },
        languages: ['/de/'],
        scssForwards: ['@/assets/breakpoints.scss'],
        themes,
    },
    modules: ['@remindgmbh/nuxt-typo3'],
    vite: {
        server: {
            hmr: {
                protocol: 'wss',
                clientPort: 443,
                path: 'hmr/',
            },
        },
    },
})
