import {
    addAutoImportDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
    installModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import { I18nOptions } from 'vue-i18n'
import { name, version } from '../package.json'

const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    api: {
        baseUrl: string
        footerContentType: number
        initialDataType: number
    }
    baseUrl: string
    contentElements: {
        [type: string]: {
            fullWidth?: boolean
            ignoreCookies?: boolean
        }
    }
    cookiebotUid?: string
    customCssVariables?: string
    i18n: I18nOptions
    images: {
        ceGallery: {
            lazy: boolean
            navigationHeight: number
            previewHeight: number
        }
        ceImage: {
            lazy: boolean
            responsive: boolean
        }
        ceTextmedia: {
            lazy: boolean
            responsive: boolean
        }
        ceTextpic: {
            lazy: boolean
            responsive: boolean
        }
    }
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
            footerContentType: 836,
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
        images: {
            ceImage: {
                lazy: true,
                responsive: true,
            },
            ceGallery: {
                lazy: true,
                navigationHeight: 256,
                previewHeight: 256,
            },
            ceTextmedia: {
                lazy: true,
                responsive: true,
            },
            ceTextpic: {
                lazy: true,
                responsive: true,
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
            const cssOptions = {
                preprocessorOptions: {
                    scss: {
                        additionalData:
                            `@forward "${options.customCssVariables}";`.concat(
                                nuxt.options.vite.css?.preprocessorOptions?.scss
                                    .additionalData ?? ''
                            ),
                    },
                },
            }

            nuxt.options.vite.css = defu(
                cssOptions,
                nuxt.options.vite.css ?? {}
            )
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

        installModule('@nuxt/image-edge', {
            provider: 'typo3',
            providers: {
                typo3: {
                    name: 'typo3',
                    provider: resolver.resolve('runtime/providers/typo3'),
                },
            },
        })

        addAutoImportDir([resolver.resolve('runtime/composables/**/use*.ts')])
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
            ignore: ['**/shared.ts', '**/index.ts'],
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/cookiebot'),
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
        addPlugin({
            src: resolver.resolve('runtime/plugins/image'),
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
