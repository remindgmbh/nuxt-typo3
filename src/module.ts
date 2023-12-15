import {
    addImportsDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
    installModule,
    addRouteMiddleware,
    addImports,
} from '@nuxt/kit'
import type { ViteConfig } from '@nuxt/schema'
import { defu } from 'defu'
import type { CSSOptions } from 'vite'
import { name, version } from '../package.json'

export const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    // TYPO3 Headless Backend information
    api: {
        // URL of the TYPO3 Backend
        baseUrl?: string
        // Type number of the footer data, only required if changed in backend
        footerDataType?: number
        // Type number of the initial data, only required if changed in backend
        initialDataType?: number
    }
    // URL of the frontend project, used for page meta data
    baseUrl: string
    componentPrefix?: string
    // UID from cookiebot, required if cookie consent banner should be shown
    cookiebotUid?: string
    // Path to SCSS Variables to override default values defined in runtime/assets/style/*.scss
    // See playground assets/breakpoints.scss or assets/colors.scss for example
    scssForwards?: string | string[]
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: CONFIG_KEY,
    },
    defaults: {
        api: {
            baseUrl: '',
            footerDataType: 836,
            initialDataType: 834,
        },
        baseUrl: '',
        cookiebotUid: '',
    },
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        options = nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(
            nuxt.options.runtimeConfig.public[CONFIG_KEY],
            options,
        )

        if (options.scssForwards) {
            const scssForwards =
                typeof options.scssForwards === 'string'
                    ? [options.scssForwards]
                    : options.scssForwards
            const cssOptions: CSSOptions = {
                preprocessorOptions: {
                    scss: {
                        additionalData: `${scssForwards
                            .map((value) => `@forward "${value}"`)
                            .join(';')};`.concat(
                            nuxt.options.vite.css?.preprocessorOptions?.scss
                                .additionalData ?? '',
                        ),
                    },
                },
            }

            nuxt.options.vite.css = defu(
                cssOptions,
                nuxt.options.vite.css ?? {},
            )
        }

        const viteConfig: ViteConfig = {
            // https://github.com/vitejs/vite/issues/9220
            optimizeDeps: {
                include: ['yup'],
            },
        }

        nuxt.options.vite = defu(viteConfig, nuxt.options.vite)

        nuxt.options.pages = true

        nuxt.options.alias['#nuxt-typo3'] = resolver.resolve('runtime')

        nuxt.options.css.unshift(
            resolver.resolve('runtime/assets/styles/container.scss'),
            resolver.resolve('runtime/assets/styles/paddedContent.scss'),
        )

        await installModule('@remindgmbh/nuxt-logger')

        addImportsDir(resolver.resolve('runtime/composables/**/*'))
        addImports({
            from: resolver.resolve('runtime/models'),
            name: '*',
            as: 'T3Model',
        })
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/cookiebot'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/i18n'),
        })
        addRouteMiddleware({
            name: 't3-data',
            path: resolver.resolve('runtime/middleware/data.global'),
            global: true,
        })
        extendPages((pages) => {
            pages.push({
                name: 'T3Page',
                path: '/:pathMatch(.*)*',
                file: resolver.resolve('runtime/pages/T3Page'),
            })
        })
    },
})
