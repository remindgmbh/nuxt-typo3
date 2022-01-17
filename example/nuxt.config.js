import { resolve } from 'path'

export default {
    buildModules: ['@nuxt/typescript-build'],
    rootDir: resolve(__dirname, '..'),
    buildDir: resolve(__dirname, '.nuxt'),
    srcDir: __dirname,
    modules: ['../src/module', 'nuxt-typo3', '@nuxtjs/i18n', '~/modules/mock'],
    server: {
        port: 4000,
    },
    build: {
        transpile: ['nuxt-typo3'],
        postcss: null,
    },
    typo3: {
        baseURL: 'http://localhost:4000',
        api: {
            baseURL: 'http://localhost:4000/api',
        },
        i18n: {
            locales: ['en'],
            defaultLocale: 'en',
        },
    },
}
