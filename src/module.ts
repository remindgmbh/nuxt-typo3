import { resolve, join } from 'path'
import { Module } from '@nuxt/types'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import defu from 'defu'
import { Options } from './options'
import de from './locale/de.json'

const nuxtModule: Module = function () {
    const i18n = {
        vueI18n: {
            messages: {
                de: {
                    'rmnd-nuxt-typo3': de,
                },
            },
        },
    }

    this.options.i18n = defu(this.options.i18n, i18n)

    const options = defu(this.options.rmndTypo3, new Options())

    this.addPlugin({
        src: resolve(__dirname, './plugins/components.ts'),
        options,
        fileName: join('rmnd-typo3', 'plugins.components.ts'),
    })

    this.addPlugin({
        src: resolve(__dirname, './plugins/layouts.ts'),
        options,
        fileName: join('rmnd-typo3', 'plugins.layouts.ts'),
    })

    this.addPlugin({
        src: resolve(__dirname, './plugins/context.ts'),
        options,
        filename: join('rmnd-typo3', 'plugins.context.ts'),
    })

    this.extendRoutes(
        (
            routes: NuxtRouteConfig[],
            resolve: (...pathSegments: string[]) => string
        ) => {
            routes.push({
                name: 'rmnd-page',
                path: '/*',
                component: resolve(__dirname, './pages/Default.ts'),
            })
        }
    )

    this.extendBuild((config) => {
        if (config.resolve?.alias) {
            config.resolve.alias['~rmnd-typo3'] = resolve(__dirname)
        }
    })
}

;(nuxtModule as any).meta = require('../package.json')

export default nuxtModule
