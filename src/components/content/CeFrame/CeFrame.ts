import Vue from 'vue'

export default Vue.extend({
    name: 'CeFrame',
    functional: true,
    props: {
        spaceAfter: {
            type: String,
            required: false,
            default: '',
        },
        spaceAfterInside: {
            type: String,
            required: false,
            default: '',
        },
        spaceBefore: {
            type: String,
            required: false,
            default: '',
        },
        spaceBeforeInside: {
            type: String,
            required: false,
            default: '',
        },
        backgroundColor: {
            type: String,
            required: false,
            default: '',
        },
        container: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    render(createElement, context) {
        return createElement(
            'article',
            {
                class: [
                    'ce-frame',
                    {
                        container: context.props.container,
                        [`ce-frame--space-before-${context.props.spaceBefore}`]: context
                            .props.spaceBefore,
                        [`ce-frame--space-before-inside-${context.props.spaceBeforeInside}`]:
                            context.props.spaceBeforeInside &&
                            context.props.backgroundColor,
                        [`ce-frame--space-after-${context.props.spaceAfter}`]: context
                            .props.spaceAfter,
                        [`ce-frame--space-after-inside-${context.props.spaceAfterInside}`]:
                            context.props.spaceAfterInside &&
                            context.props.backgroundColor,
                    },
                ],
            },
            context.children
        )
    },
})
