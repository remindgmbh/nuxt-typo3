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
        languages: ['/de/'],
        scssForwards: ['@/assets/breakpoints.scss'],
        theme: {
            default: 'light',
            themes: {
                light: {
                    colors: {
                        default: {
                            value: '#ffffff',
                            contrast: '#000000',
                        },
                        white: {
                            value: '#ffffff',
                            contrast: '#000000',
                        },
                        black: {
                            value: '#000000',
                            contrast: '#ffffff',
                        },
                        primary: {
                            value: '#607d8b',
                            contrast: '#ffffff',
                        },
                        secondary: {
                            value: '#009688',
                            contrast: '#000000',
                        },
                        accent: {
                            value: '#fdd835',
                            contrast: '#000000',
                        },
                    },
                },
                dark: {
                    colors: {
                        default: {
                            value: '#000000',
                            contrast: '#ffffff',
                        },
                    },
                },
            },
        },
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
