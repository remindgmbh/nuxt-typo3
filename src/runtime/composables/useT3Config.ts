import { defu } from 'defu'
import * as T3Model from '../models'
import { ModuleOptions } from '../../module'
import { useAppConfig, useRuntimeConfig } from '#imports'

type Config = ModuleOptions &
    T3Model.Config.AppConfigInput &
    T3Model.Config.AppConfigDefaults

export function useT3Config(): Config {
    const appConfigDefaults: T3Model.Config.AppConfigDefaults = {
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
