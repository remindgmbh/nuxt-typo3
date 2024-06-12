import type * as T3Model from '../models'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { defu } from 'defu'

export function useT3Config() {
    const appConfigDefaults: T3Model.Config.AppConfigDefaults = {
        breadcrumbs: {
            fullWidth: false,
        },
        contentElements: {},
        form: {
            fieldset: ['MultiCheckbox', 'RadioButton'],
            hideLabel: ['Checkbox'],
        },
        i18n: {
            locale: 'de',
        },
        imageFileExtension: 'webp',
        languages: [],
        spacing: {
            /* eslint-disable sort-keys */
            'extra-small': '0.5rem',
            small: '1rem',
            medium: '2rem',
            large: '4rem',
            'extra-large': '8rem',
        },
        theme: {
            backgroundColors: {},
            default: 'default',
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
