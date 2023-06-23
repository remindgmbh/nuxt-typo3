import { Typo3 } from '../src/runtime/models'
import de from './locales/de.json'
import en from './locales/en.json'
import { themes } from './themes'
import { defineAppConfig } from '#imports'

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
        defaultTheme: 'light',
        i18n: {
            messages: {
                de,
                en,
            },
        },
        languages: ['/de/'],
        themes,
    },
})
