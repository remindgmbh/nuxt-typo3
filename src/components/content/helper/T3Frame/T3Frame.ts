import Vue, { PropType } from 'vue'
import { ContentOptions } from '../../../../options'
import './T3Frame.scss'

export default Vue.extend({
    name: 'T3Frame',
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
        const container = context.props.options?.fullWidth
            ? false
            : !context.props.backgroundColor ||
              context.props.backgroundFullWidth

        return createElement(
            'article',
            {
                class: [
                    't3-frame',
                    {
                        container,
                        [`t3-frame--space-before-${context.props.spaceBefore}`]:
                            context.props.spaceBefore,
                        [`t3-frame--space-before-inside-${context.props.spaceBeforeInside}`]:
                            context.props.spaceBeforeInside &&
                            context.props.backgroundColor,
                        [`t3-frame--space-after-${context.props.spaceAfter}`]:
                            context.props.spaceAfter,
                        [`t3-frame--space-after-inside-${context.props.spaceAfterInside}`]:
                            context.props.spaceAfterInside &&
                            context.props.backgroundColor,
                    },
                ],
            },
            context.children
        )
    },
})
