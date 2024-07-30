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
        count: {
            max: '{label} darf maximal {max} ausgewähle Werte haben.',
            min: '{label} muss mindestens {min} ausgewählte Werte haben.',
        },
        dateRange: {
            max: '{label} darf nicht nach {max} liegen.',
            min: '{label} darf nicht vor {min} liegen.',
        },
        emailAddress: '{label} muss eine gültige E-Mail-Adresse sein.',
        float: '{label} darf nur numerische Zeichen enthalten.',
        integer: '{label} muss eine ganze Zahl sein.',
        notEmpty: '{label} ist ein Pflichtfeld.',
        numberRange: {
            max: '{label} darf maximal {max} sein.',
            min: '{label} muss mindestens {min} sein.',
        },
        regularExpression: 'Das Format von {label} ist ungültig.',
        stringLength: {
            max: '{label} darf maximal {max} Zeichen lang sein.',
            min: '{label} muss mindestens {min} Zeichen lang sein.',
        },
    },
}
