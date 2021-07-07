import Vue from 'vue'

export default Vue.extend({
    name: 'CeBackground',
    functional: true,
    props: {
        backgroundColor: {
            type: String,
            required: true,
        },
        backgroundWide: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: [
                    'ce-background',
                    `ce-background--${context.props.backgroundColor}`,
                    { container: !context.props.backgroundWide },
                ],
            },
            context.children
        )
    },
})
