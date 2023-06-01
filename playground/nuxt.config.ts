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
        scssForwards: ['@/assets/breakpoints.scss'],
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
