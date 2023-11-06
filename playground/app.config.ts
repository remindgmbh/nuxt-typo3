import { Typo3 } from '../src/runtime/models'
import de from './locales/de.json'
import en from './locales/en.json'
import colors from './colors'
import { defineAppConfig } from '#imports'

const backgroundColors = {
    light: {
        black: colors.black,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
    },
    dark: {
        black: colors.blackLight,
    },
}

export default defineAppConfig({
    typo3: {
        contentElements: {
            header: {
                maxWidth: (contentElement: Typo3.Content.Element) =>
                    !contentElement.appearance.backgroundColor ? 'lg' : 'md',
                width: 'extended',
            },
            text: {
                maxWidth: 'md',
            },
            textmedia: {
                maxWidth: 'lg',
                ignoreCookies: true,
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
