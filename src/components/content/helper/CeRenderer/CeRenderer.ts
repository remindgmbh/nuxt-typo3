import Vue, { PropType } from 'vue'
import { ContentOptions, Options } from '../../../../options'

export default Vue.extend({
    name: 'CeRenderer',
    functional: true,
    props: {
        content: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Object as PropType<Options>,
            required: true,
        },
    },
    render(createElement, context) {
        function renderDynamic(element: any, index: number) {
            return createElement('ce-dynamic', {
                props: {
                    data: element,
                    type: element.type,
                    index,
                },
            })
        }

        function renderWrapper(element: any, index: number) {
            return createElement(
                'ce-wrapper',
                {
                    props: element.appearance,
                },
                [renderDynamic(element, index)]
            )
        }

        function renderFrame(
            element: any,
            index: number,
            options: ContentOptions
        ) {
            return createElement(
                'ce-frame',
                {
                    props: {
                        ...element.appearance,
                        options,
                    },
                },
                [
                    options?.noWrapper
                        ? renderDynamic(element, index)
                        : renderWrapper(element, index),
                ]
            )
        }

        function renderBackground(
            element: any,
            index: number,
            options: ContentOptions
        ) {
            return createElement(
                'ce-background',
                {
                    props: {
                        ...element.appearance,
                        options,
                    },
                },
                [renderFrame(element, index, options)]
            )
        }

        return context.props.content.map((element: any, index) => {
            const type =
                element.type === 'structured_content'
                    ? element.content.structure.layout
                    : element.type
            const options: ContentOptions = context.props.options.content[type]
            return element.appearance.backgroundColor
                ? renderBackground(element, index, options)
                : renderFrame(element, index, options)
        })
    },
})
