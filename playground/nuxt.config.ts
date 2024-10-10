export default defineNuxtConfig({
    components: [
        {
            global: true,
            path: '@/components',
        },
    ],
    css: ['@/assets/base.scss'],
    imports: {
        autoImport: false,
    },
    logger: {
        level: 3,
    },
    modules: ['@remindgmbh/nuxt-typo3'],
    runtimeConfig: {
        public: {
            typo3: {
                api: {
                    baseUrl: '',
                },
                baseUrl: '',
            },
        },
    },
    typescript: {
        shim: false,
        strict: true,
    },
    typo3: {
        componentPrefix: 'Pg',
        scssForwards: ['@/assets/variables.scss'],
    },
})
