import de from './locales/de.json'
import en from './locales/en.json'

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
        images: {
            ceTextpic: {
                fullWidthBreakpoint: 'sm',
            },
        },
        languages: ['/de/'],
        scssForwards: ['@/assets/breakpoints.scss', '@/assets/colors.scss'],
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
