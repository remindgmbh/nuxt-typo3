import { type MessageContext } from '../plugins/i18n'
import { useT3Util } from '../composables/util/useT3Util'

const { capitalize } = useT3Util()

export default {
    cookie: {
        accept: ({ linked, named }: MessageContext) => {
            const categoryKey = named('category')
            const categoryValue = linked(`cookie.category.${categoryKey}`)
            return `Accept ${categoryValue} cookies`
        },
        category: {
            marketing: 'marketing',
            necessary: 'necessary',
            preferences: 'preferences',
            statistics: 'statistics',
        },
        message: ({ named, linked }: MessageContext) => {
            const categoryKey = named('category')
            const categoryValue = linked(`cookie.category.${categoryKey}`)
            const capitalizedCategoryValue = capitalize(categoryValue)
            return `${capitalizedCategoryValue} cookies have to be accepted to show this content.`
        },
    },
    form: {
        loading: 'Loading',
        required: 'Required field',
        submit: 'Submit',
        success: 'Success',
    },
    unexpectedError: 'unexpected error',
    validation: {
        alphanumeric: '{label} may only contain alpha-numeric characters.',
        email: '{label} must be a valid email address.',
        integer: '{label} must be an integer.',
        max: '{label} must be {max} or less.',
        min: '{label} must be {min} or more.',
        numeric: '{label} may only contain numeric characters.',
        regex: '{label} format is invalid.',
        required: '{label} is required.',
        type: '{label} must be of type {type}.',
    },
}
