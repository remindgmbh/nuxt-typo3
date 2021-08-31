import Vue from 'vue'

export default Vue.extend({
    name: 'CeWrapper',
    functional: true,
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: 'ce-wrapper',
            },
            context.children
        )
    },
})
