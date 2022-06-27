import { defineNuxtPlugin } from '#app'
import { setLocale } from 'yup'
import { Api, useConfig, useI18n } from '#nuxt-typo3'

export default defineNuxtPlugin((nuxt) => {
    const config = useConfig()

    const { t, mergeLocaleMessage } = useI18n(nuxt)

    if (config.i18n.messages) {
        Object.keys(config.i18n.messages).forEach((locale) =>
            mergeLocaleMessage(locale, config.i18n.messages?.[locale])
        )
    }

    setLocale({
        mixed: {
            required: ({ label }) => t('validation.required', { label }),
            notType: ({ label, type }) => {
                switch (type) {
                    case 'number':
                        return t('validation.numeric', { label })
                }
                return t('validation.type', { label, type })
            },
        },
        array: {
            min: ({ label, min }) => {
                if (min === 1) {
                    return t('validation.required', { label })
                }
            },
        },
        date: {
            // TODO Date format based on locale
            min: ({ label, min }) => t('validation.min', { label, min }),
            max: ({ label, max }) => t('validation.max', { label, max }),
        },
        number: {
            integer: ({ label }) => t('validation.integer', { label }),
            min: ({ label, min }) => t('validation.min', { label, min }),
            max: ({ label, max }) => t('validation.max', { label, max }),
        },
        string: {
            email: ({ label }) => t('validation.email', { label }),
            matches: ({ label, regex }) => {
                if (regex === Api.Form.REGEX_ALPHANUMERIC) {
                    return t('validation.alphanumeric', { label })
                } else {
                    return t('validation.regex', { label, regex })
                }
            },
        },
    })
})
