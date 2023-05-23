import type { ThemesOptions } from '../src/module'

const colors = {
    default: '#ffffff',
    white: '#ffffff',
    black: '#000000',
    primary: '#607d8b',
    secondary: '#009688',
    accent: '#fdd835',
}

export const themes: ThemesOptions = {
    light: {
        backgroundColors: {},
        contentElements: {
            teaser_logo: {
                default: {},
                backgroundColors: {},
            },
        },
        general: {
            background: colors.white,
            font: colors.black,
            primary: colors.primary,
            secondary: colors.secondary,
            accent: colors.accent,
        },
    },
    dark: {
        backgroundColors: {},
        contentElements: {},
        general: {
            background: colors.black,
            font: colors.white,
        },
    },
}
