import { Config } from '../src/runtime/models'

const colors = {
    default: '#ffffff',
    white: '#ffffff',
    black: '#000000',
    primary: '#607d8b',
    secondary: '#009688',
    accent: '#fdd835',
}

export const themes: Config.ThemesOptions = {
    light: {
        backgroundColors: {
            black: colors.black,
            primary: colors.primary,
            secondary: colors.secondary,
            accent: colors.accent,
        },
        contentElements: {
            teaser_logo: {
                default: {},
                backgroundColors: {},
            },
        },
        additionalData: {
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
        additionalData: {
            background: colors.black,
            font: colors.white,
        },
    },
}
