import { defineNuxtPlugin, useAppConfig, useT3I18n } from '#imports'

export default defineNuxtPlugin((nuxt) => {
    const { vueApp } = nuxt

    const { typo3: config } = useAppConfig()

    const i18n = useT3I18n()

    const { mergeLocaleMessage } = i18n.global

    if (config.i18n.messages) {
        for (const locale of Object.keys(config.i18n.messages)) {
            mergeLocaleMessage(
                locale,
                config.i18n.messages[
                    locale as keyof typeof config.i18n.messages
                ],
            )
        }
    }

    vueApp.use(i18n)
})
