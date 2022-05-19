import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

export default defineNuxtConfig({
    head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
    },
    runtimeConfig: {
        public: {
            typo3: {
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
    },
    modules: [MyModule],
})
