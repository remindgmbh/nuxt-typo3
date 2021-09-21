import Vue, { PropType } from 'vue'
import { ContentOptions } from '../../../../options'

export default Vue.extend({
    name: 'CeBackground',
    functional: true,
    props: {
        backgroundColor: {
            type: String,
            required: true,
        },
        backgroundFullWidth: {
            type: Number,
            required: false,
            default: 0,
        },
        options: {
            type: Object as PropType<ContentOptions | undefined>,
            required: false,
            default: undefined,
        },
    },
    render(createElement, context) {
        const container =
            !context.props.options?.fullWidth &&
            !context.props.backgroundFullWidth

        return createElement(
            'div',
            {
                class: [
                    'ce-background',
                    `ce-background--${context.props.backgroundColor}`,
                    { container },
                ],
            },
            context.children
        )
    },
})
