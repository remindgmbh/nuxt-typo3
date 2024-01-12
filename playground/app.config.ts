import colors from './colors'
import { defineAppConfig } from '#imports'

import de from './locales/de.json'
import en from './locales/en.json'

const backgroundColors = {
    dark: {
        black: colors.blackLight,
    },
    light: {
        accent: colors.accent,
        black: colors.black,
        primary: colors.primary,
        secondary: colors.secondary,
    },
}

export default defineAppConfig({
    typo3: {
        contentElements: {
            header: {
                maxWidth: (contentElement) =>
                    !contentElement.appearance.backgroundColor ? 'lg' : 'md',
                width: 'extended',
            },
            text: {
                maxWidth: 'md',
            },
            textmedia: {
                ignoreCookies: true,
                maxWidth: 'lg',
                padding: false,
            },
        },
        i18n: {
            messages: {
                de,
                en,
            },
        },
        languages: ['/de/'],
        theme: {
            backgroundColors,
            default: 'light',
        },
    },
})
