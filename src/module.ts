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

export const CONFIG_KEY = 'typo3'

interface ImageOptions {
    // overwrite global image file extension for only this component
    fileExtension?: string
    // load image with dimensions according to windows size
    responsive?: boolean
}

// Options used for content elements with image gallery, currently used in CeImageGallery
interface GalleryOptions {
    navigationHeight?: number
    previewHeight?: number
}

interface CeOptions {
    // if set to true, content element ignores container width
    fullWidth?: boolean
    // if set to true, content element is shown even if cookie should block it
    // required if not the whole content element should be blocked by cookie,
    // but only one part, for example a video in a textmedia element.
    // in that case cookie behaviour has to be implemented in custom component,
    // see T3CeTextmedia in playground for example
    ignoreCookies?: boolean
    images?: ImageOptions
    gallery?: GalleryOptions
}

export interface Color {
    value: string
    contrast: string
}

export interface ModuleOptions {
    // TYPO3 Headless Backend information
    api: {
        // URL of the TYPO3 Backend
        baseUrl?: string
        // Type number of the footer content, only required if changed in backend
        footerContentType?: number
        // Type number of the initial data, only required if changed in backend
        initialDataType?: number
    }
    // URL of the frontend project, used for page meta data
    baseUrl: string
    // config for content elements, type key has to match CType
    contentElements: {
        [type: string]: CeOptions
    }
    // UID from cookiebot, required if cookie consent banner should be shown
    cookiebotUid?: string
    // options from https://github.com/intlify/vue-i18n-next
    i18n: I18nOptions
    // global file extension for images coming from typo3
    // can be overwritten for specific content elements
    imageFileExtension: string
    // language paths in addition to default language
    languages: string[]
    layout: {
        breadcrumbs: {
            // if set to true, breadcrumbs ignore container width
            fullWidth: boolean
        }
    }
    // Path to SCSS Variables to override default values defined in runtime/assets/style/*.scss
    // See playground assets/breakpoints.scss or assets/colors.scss for example
    scssForwards?: string | string[]
    spacing: {
        'extra-small': string
        small: string
        medium: string
        large: string
        'extra-large': string
        [other: string]: string
    }
    theme: {
        default: string
        themes: {
            [themeName: string]: {
                [colorName: string]: Color
            }
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
        contentElements: {
            imageGallery: {
                gallery: {
                    navigationHeight: 256,
                    previewHeight: 256,
                },
            },
        },
        i18n: {
            locale: 'de',
        },
        imageFileExtension: 'webp',
        languages: [],
        layout: {
            breadcrumbs: {
                fullWidth: false,
            },
        },
        spacing: {
            'extra-small': '0.5rem',
            small: '1rem',
            medium: '2rem',
            large: '4rem',
            'extra-large': '8rem',
        },
        theme: {
            default: 'default',
            themes: {
                default: {},
            },
        },
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        // Use values from default theme for missing values in themes
        Object.keys(options.theme.themes)
            .filter((name) => name !== 'default')
            .forEach((name) => {
                options.theme.themes[name] = defu(
                    options.theme.themes[name],
                    options.theme.themes[options.theme.default]
                )
            })

        options = nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(
            nuxt.options.runtimeConfig.public[CONFIG_KEY],
            JSON.parse(JSON.stringify(options))
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
