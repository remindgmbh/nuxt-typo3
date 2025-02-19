import {
    addComponentsDir,
    addImports,
    addImportsDir,
    addPlugin,
    addRouteMiddleware,
    createResolver,
    defineNuxtModule,
    extendPages,
    installModule,
} from '@nuxt/kit'
import { name, version } from '../package.json'
import type { ViteConfig } from '@nuxt/schema'
import { defu } from 'defu'

export const CONFIG_KEY = 'typo3'

export default defineNuxtModule({
    meta: {
        configKey: CONFIG_KEY,
        name,
        version,
    },
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.hook('prepare:types', (options) => {
            options.references.push(
                {
                    path: resolver.resolve('runtime/types/hooks.d.ts'),
                },
                {
                    path: resolver.resolve('runtime/types/schema.d.ts'),
                },
            )
        })

        const viteConfig: ViteConfig = {
            css: {
                preprocessorOptions: {
                    scss: {
                        api: 'modern',
                    },
                },
            },
            // https://github.com/vitejs/vite/issues/9220
            // without this the following error occurs when using this module in a project in dev mode:
            // Uncaught (in promise) SyntaxError: The requested module doesn't provide an export named: 'snakeCase'
            optimizeDeps: {
                include: ['yup'],
            },
        }

        nuxt.options.vite = defu(viteConfig, nuxt.options.vite)

        nuxt.options.pages = true

        nuxt.options.alias['@remindgmbh/nuxt-typo3'] =
            resolver.resolve('runtime')

        nuxt.options.css.unshift(
            resolver.resolve('runtime/assets/styles/global.scss'),
        )

        await installModule('@remindgmbh/nuxt-logger')

        addImportsDir(resolver.resolve('runtime/composables/**/*'))
        addImports({
            as: 'T3Model',
            from: resolver.resolve('runtime/models'),
            name: '*',
        })
        addImports({
            as: 'T3Error',
            from: resolver.resolve('runtime/error'),
            name: '*',
        })
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/appConfig'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/i18n'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/htmlSsrDirective'),
        })
        addRouteMiddleware({
            global: true,
            name: 't3-data',
            path: resolver.resolve('runtime/middleware/data.global'),
        })
        extendPages((pages) => {
            pages.push({
                file: resolver.resolve('runtime/pages/T3Page'),
                name: 'T3Page',
                path: '/:pathMatch(.*)*',
            })
        })
    },
})
