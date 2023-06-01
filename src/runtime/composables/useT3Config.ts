import { defu } from 'defu'
import { ModuleOptions } from '../../module'
import { T3Model, useAppConfig, useRuntimeConfig } from '#imports'

export function useT3Config(): T3Model.Config.AppConfigWithDefaults &
    ModuleOptions {
    const appConfigDefaults: T3Model.Config.AppConfigWithDefaults = {
        contentElements: {
            imageGallery: {
                gallery: {
                    navigationHeight: 256,
                    previewHeight: 256,
                },
            },
        },
        defaultTheme: 'default',
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
        themes: {
            default: {
                backgroundColors: {},
                contentElements: {},
                additionalData: {},
            },
        },
    }

    const appConfig = useAppConfig()
    const runtimeConfig = useRuntimeConfig()

    const config = {
        ...defu(appConfig.typo3, appConfigDefaults),
        ...runtimeConfig.public.typo3,
    }
    return config
}
