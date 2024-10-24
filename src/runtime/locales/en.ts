import { type MessageContext } from 'vue-i18n'
import { useT3Util } from '../composables/util/useT3Util'

const { capitalize } = useT3Util()

export default {
    cookie: {
        accept: ({ linked, named }: MessageContext) =>
            `Accept ${linked(`cookie.category.${named('category')}`)} cookies`,
        category: {
            marketing: 'marketing',
            necessary: 'necessary',
            preferences: 'preferences',
            statistics: 'statistics',
        },
        message: ({ named, linked }: MessageContext) =>
            `${capitalize(linked(`cookie.category.${named('category')}`))} cookies have to be accepted to show this content.`,
    },
    form: {
        loading: 'Loading',
        required: 'Required field',
        submit: 'Submit',
        success: 'Success',
    },
    validation: {
        alphanumeric: '{label} may only contain alpha-numeric characters.',
        count: {
            max: '{label} may have a maximum of {max} selected values.',
            min: '{label} must have at least {min} selected values.',
        },
        dateRange: {
            max: '{label} must not be after {max}.',
            min: '{label} must not be before {min}.',
        },
        emailAddress: '{label} must be a valid email address.',
        float: '{label} may only contain numeric characters.',
        integer: '{label} must be an integer.',
        notEmpty: '{label} is required.',
        numberRange: {
            max: '{label} may be a maximum of {max}.',
            min: '{label} must be at least {min}.',
        },
        regularExpression: '{label} format is invalid.',
        stringLength: {
            max: '{label} must be {max} characters or less.',
            min: '{label} must be {min} characters or more.',
        },
    },
}
