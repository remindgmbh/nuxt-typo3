import { resolve, join } from 'path'
import { Module } from '@nuxt/types'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import defu from 'defu'
import { Options } from './options'

const content: Module<Options> = function () {
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
            const path = '/*'
            const pageRoute = routes.find((route) => route.path === path)
            const component = resolve(__dirname, './pages/_.vue')
            if (pageRoute) {
                pageRoute.component = component
            } else {
                routes.push({
                    name: 'page',
                    path,
                    component,
                })
            }
        }
    )

    this.extendBuild((config) => {
        if (config.resolve?.alias) {
            config.resolve.alias['~rmnd-typo3'] = resolve(__dirname)
        }
    })
}

export default content

module.exports.meta = require('../package.json')
