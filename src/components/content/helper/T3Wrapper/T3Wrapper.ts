import Vue from 'vue'
import './T3Wrapper.scss'

export default Vue.extend({
    name: 'T3Wrapper',
    functional: true,
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: 't3-wrapper',
            },
            context.children
        )
    },
})
