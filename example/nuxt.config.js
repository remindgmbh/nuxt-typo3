import { resolve } from 'path'

export default {
    buildModules: ['@nuxt/typescript-build'],
    rootDir: resolve(__dirname, '..'),
    buildDir: resolve(__dirname, '.nuxt'),
    srcDir: __dirname,
    modules: [{ handler: require('../') }],
    build: {
        transpile: ['nuxt-typo3'],
    },
}
