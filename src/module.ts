import {
    addAutoImportDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
} from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    api: {
        baseUrl: string
        initialDataType: number
    }
    contentElements: {
        [type: string]: {
            fullWidth?: boolean
        }
    }
    customCssVariables?: string
    languages: string[]
    layout: {
        breadcrumbs: {
            fullWidth: boolean
        }
    }
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
            initialDataType: 834,
        },
        contentElements: {},
        languages: [],
        layout: {
            breadcrumbs: {
                fullWidth: false,
            },
        },
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        options = nuxt.options.runtimeConfig.public.typo3 = defu(
            nuxt.options.runtimeConfig.public.typo3,
            options
        )

        if (options.customCssVariables) {
            const forwardStatement = `@forward "${options.customCssVariables}";`
            switch (nuxt.options.builder) {
                case '@nuxt/vite-builder':
                    nuxt.options.vite.css = {
                        ...nuxt.options.vite.css,
                        preprocessorOptions: {
                            ...nuxt.options.vite.css?.preprocessorOptions,
                            scss: {
                                ...nuxt.options.vite.css?.preprocessorOptions
                                    ?.scss,
                                additionalData: forwardStatement,
                            },
                        },
                    }
                    break
                case '@nuxt/webpack-builder':
                    nuxt.options.webpack.loaders.scss.additionalData =
                        forwardStatement
                    break
                default:
            }
        }

        nuxt.options.css.unshift(
            resolver.resolve('runtime/assets/styles/container.scss'),
            resolver.resolve('runtime/assets/styles/text.scss')
        )

        addAutoImportDir([
            resolver.resolve('runtime/composables'),
            resolver.resolve('runtime/composables/content-elements'),
        ])
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
            ignore: ['**/shared.ts'],
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/init'),
        })
        extendPages((pages) => {
            pages.push({
                name: 'T3Page',
                path: '/:pathMatch(.*)*',
                file: resolver.resolve('runtime/pages/T3Page'),
            })
        })

        nuxt.options.alias['#nuxt-typo3'] = resolver.resolve('runtime')
    },
})
