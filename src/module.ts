import {
    addImportsDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
    installModule,
} from '@nuxt/kit'
import { ViteConfig } from '@nuxt/schema'
import { defu } from 'defu'
import { CSSOptions } from 'vite'
import { I18nOptions } from 'vue-i18n'
import { name, version } from '../package.json'

const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    // TYPO3 Headless Backend information
    api: {
        // URL of the TYPO3 Backend
        baseUrl: string
        // Type number of the footer content, only required if changed in backend
        footerContentType: number
        // Type number of the initial data, only required if changed in backend
        initialDataType: number
    }
    // URL of the frontend project, used for page meta data
    baseUrl: string
    // config for content elements, type key has to match CType
    contentElements: {
        [type: string]: {
            // if set to true, content element ignores container width
            fullWidth?: boolean
            // if set to true, content element is shown even if cookie should block it
            // required if not the whole content element should be blocked by cookie,
            // but only one part, for example a video in a textmedia element.
            // in that case cookie behaviour has to be implemented in custom component,
            // see T3CeTextmedia in playground for example
            ignoreCookies?: boolean
        }
    }
    // UID from cookiebot, required if cookie consent banner should be shown
    cookiebotUid?: string
    // Path to SCSS Variables to override default values defined in runtime/assets/style/variables.scss
    // See playground assets/variables.scss for example
    customScssVariables?: string
    // options from https://github.com/intlify/vue-i18n-next
    i18n: I18nOptions
    // image options for content elements
    // lazy: load images only when in viewport
    // responsive: load image with dimensions according to windows size
    images: {
        ceImageGallery: {
            // lazy doesn't work for navigation and preview images
            lazy: boolean
            // max height for images used in navigation
            navigationHeight: number
            // max height for images used in preview
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
    // language paths in addition to default language
    languages: string[]
    layout: {
        breadcrumbs: {
            // if set to true, breadcrumbs ignore container width
            fullWidth: boolean
        }
    }
    news: {
        pagination: {
            // Position of the pagination for news list
            position: 'top' | 'bottom' | 'both'
        }
    }
    solr: {
        pagination: {
            // Position of the pagination for solr search results
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
        images: {
            ceImage: {
                lazy: true,
                responsive: true,
            },
            ceImageGallery: {
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

        if (options.customScssVariables) {
            const cssOptions: CSSOptions = {
                preprocessorOptions: {
                    scss: {
                        additionalData:
                            `@forward "${options.customScssVariables}";`.concat(
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

        const viteConfig: ViteConfig = {
            // https://github.com/vitejs/vite/issues/9220
            optimizeDeps: {
                include: ['yup'],
            },
            define: {
                __VUE_I18N_FULL_INSTALL__: true,
                __VUE_I18N_LEGACY_API__: false,
                __INTLIFY_PROD_DEVTOOLS__: false,
            },
        }

        nuxt.options.vite = defu(viteConfig, nuxt.options.vite)

        nuxt.options.pages = true

        nuxt.options.alias['#nuxt-typo3'] = resolver.resolve('runtime')

        nuxt.options.css.unshift(
            resolver.resolve('runtime/assets/styles/container.scss')
        )

        installModule('@remindgmbh/nuxt-logger')
        // needed to prevent error: https://github.com/nuxt/framework/issues/2542#issuecomment-1008211886
        nuxt.options.modules.push('@remindgmbh/nuxt-logger')

        addImportsDir([resolver.resolve('runtime/composables/**/use*.*')])
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
            ignore: ['**/shared.*'],
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/cookiebot'),
        })
        addPlugin({
            src: resolver.resolve('runtime/plugins/i18n'),
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
