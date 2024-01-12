import { type MessageContext } from '../plugins/i18n'

export default {
    cookie: {
        accept: ({ linked, named }: MessageContext) => {
            const categoryKey = named('category')
            const categoryValue = linked(`cookie.category.${categoryKey}`)
            return `${categoryValue} Cookies zulassen`
        },
        category: {
            marketing: 'Marketing',
            necessary: 'Notwendige',
            preferences: 'Präferenzen',
            statistics: 'Statistik',
        },
        message: ({ named, linked }: MessageContext) => {
            const categoryKey = named('category')
            const categoryValue = linked(`cookie.category.${categoryKey}`)
            return `Damit dieser Inhalt angezeigt werden kann müssen ${categoryValue} Cookies zugelassen werden.`
        },
    },
    form: {
        loading: 'Lädt',
        required: 'Pflichtfeld',
        submit: 'Absenden',
        success: 'Erfolgreich',
    },
    unexpectedError: 'unerwarteter Fehler',
    validation: {
        alphanumeric: '{label} darf nur alphabetische Zeichen enthalten.',
        email: '{label} muss eine gültige E-Mail-Adresse sein.',
        integer: '{label} muss eine ganze Zahl sein.',
        max: '{label} darf maximal {max} sein.',
        min: '{label} muss mindestens {min} sein.',
        numeric: '{label} darf nur numerische Zeichen enthalten.',
        regex: 'Das Format von {label} ist ungültig.',
        required: '{label} ist ein Pflichtfeld.',
        type: '{label} muss vom Typ {type} sein.',
    },
}
