import Vue from 'vue'

export default Vue.extend({
    name: 'CeFrame',
    functional: true,
    props: {
        spaceAfter: {
            type: String,
            required: false,
            default: 'default',
        },
        spaceBefore: {
            type: String,
            required: false,
            default: 'default',
        },
        frameClass: {
            type: String,
            required: false,
            default: '',
        },
    },
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: [
                    'ce-frame',
                    {
                        container: context.props.frameClass !== 'none',
                    },
                    {
                        [`ce-frame--space-before-${context.props.spaceBefore}`]: context
                            .props.spaceBefore,
                    },
                    {
                        [`ce-frame--space-after-${context.props.spaceAfter}`]: context
                            .props.spaceAfter,
                    },
                ],
            },
            context.children
        )
    },
})
