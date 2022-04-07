import {
    addAutoImportDir,
    addComponentsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
    extendPages,
    installModule,
} from '@nuxt/kit'
import { name, version } from '../package.json'

export * from './api'

const CONFIG_KEY = 'typo3'

export interface ModuleOptions {
    customCssVariables?: string
    forms: boolean
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: CONFIG_KEY,
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

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

        installModule('@pinia/nuxt')
        addAutoImportDir([
            resolver.resolve('runtime/composables'),
            resolver.resolve('runtime/composables/content-elements'),
            resolver.resolve('runtime/stores'),
        ])
        addPlugin(resolver.resolve('runtime/plugins/initialData'))
        addPlugin(resolver.resolve('runtime/plugins/context'))
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
        })
        extendPages((pages) => {
            pages.push({
                name: 'T3Page',
                path: '/:pathMatch(.*)*',
                file: resolver.resolve('runtime/pages/T3Page'),
            })
        })

        nuxt.options.alias['#nuxt-typo3'] = resolver.resolve('')
    },
})
