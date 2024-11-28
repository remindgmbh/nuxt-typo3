import {
    type T3Model,
    defineNuxtPlugin,
    updateAppConfig,
    useAppConfig,
    useRuntimeConfig,
} from '#imports'
import defu from 'defu'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const appConfig = useAppConfig()

    const defaultAppConfig: T3Model.Config.AppConfig = {
        api: {
            baseUrl: runtimeConfig.public.typo3.api?.baseUrl,
            initialDataType: 834,
        },
        breadcrumbs: {
            fullWidth: false,
        },
        contentElements: {},
        form: {
            hideLabel: ['GridRow'],
            reverseOrder: ['Checkbox'],
            wrapper: {
                fieldset: ['Fieldset', 'MultiCheckbox', 'RadioButton'],
                label: ['Checkbox'],
            },
        },
        i18n: {
            locale: 'de',
            messages: {},
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

    const updatedAppConfig = defu(appConfig.typo3, defaultAppConfig)

    updateAppConfig({ typo3: updatedAppConfig })
})
