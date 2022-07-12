import {
    addAutoImportDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
} from '@nuxt/kit'
import { defu } from 'defu'
import { I18nOptions } from 'vue-i18n'
import { name, version } from '../package.json'

const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    api: {
        baseUrl: string
        initialDataType: number
    }
    baseUrl: string
    contentElements: {
        [type: string]: {
            fullWidth?: boolean
        }
    }
    customCssVariables?: string
    i18n: I18nOptions
    languages: string[]
    layout: {
        breadcrumbs: {
            fullWidth: boolean
        }
    }
    news: {
        pagination: {
            position: 'top' | 'bottom' | 'both'
        }
    }
    solr: {
        pagination: {
            position: 'top' | 'bottom' | 'both'
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
        baseUrl: '',
        contentElements: {},
        i18n: {
            locale: 'de',
        },
        languages: [],
        layout: {
            breadcrumbs: {
                fullWidth: false,
            },
        },
        news: {
            pagination: {
                position: 'bottom',
            },
        },
        solr: {
            pagination: {
                position: 'bottom',
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

        nuxt.options.vite.define = {
            ...nuxt.options.vite.define,
            __VUE_I18N_FULL_INSTALL__: true,
            __VUE_I18N_LEGACY_API__: false,
            __INTLIFY_PROD_DEVTOOLS__: false,
        }

        nuxt.options.pages = true

        nuxt.options.alias['#nuxt-typo3'] = resolver.resolve('runtime')

        nuxt.options.css.unshift(
            resolver.resolve('runtime/assets/styles/container.scss')
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
            src: resolver.resolve('runtime/plugins/i18n'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/yup'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/middleware'),
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
