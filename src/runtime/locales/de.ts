import type { MessageContext } from 'vue-i18n'

export default {
    cookie: {
        accept: ({ linked, named }: MessageContext) =>
            `${linked(`cookie.category.${named('category')}`)} Cookies zulassen`,
        category: {
            marketing: 'Marketing',
            necessary: 'Notwendige',
            preferences: 'Präferenzen',
            statistics: 'Statistik',
        },
        message: ({ named, linked }: MessageContext) =>
            `Damit dieser Inhalt angezeigt werden kann müssen ${linked(`cookie.category.${named('category')}`)} Cookies zugelassen werden.`,
    },
    form: {
        loading: 'Lädt',
        required: 'Pflichtfeld',
        submit: 'Absenden',
        success: 'Erfolgreich',
    },
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
        fileSize: {
            max: '{label} darf maximal {max} groß sein.',
            min: '{label} muss mindestens {min} groß sein.',
        },
        float: '{label} darf nur numerische Zeichen enthalten.',
        integer: '{label} muss eine ganze Zahl sein.',
        mimeType: '{label} muss vom Typ {mimeType} sein.',
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
