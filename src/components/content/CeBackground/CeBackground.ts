import Vue from 'vue'

export default Vue.extend({
    name: 'CeBackground',
    functional: true,
    props: {
        background: {
            type: String,
            required: true,
        },
    },
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: `ce-background ce-background--${context.props.background}`,
            },
            context.children
        )
    },
})
