import Vue, { PropType } from 'vue'
import CeDynamic from 'nuxt-typo3/lib/templates/components/content/CeDynamic'
import { ContentOptions, Options } from '../../../../options'

export default Vue.extend({
    name: 'T3Renderer',
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
            return createElement(CeDynamic, {
                props: {
                    data: element,
                    type: element.type,
                    index,
                },
            })
        }

        function renderWrapper(element: any, index: number) {
            return createElement(
                't3-wrapper',
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
                't3-frame',
                {
                    props: {
                        ...element.appearance,
                        options,
                    },
                },
                [
                    options?.wrapper
                        ? renderWrapper(element, index)
                        : renderDynamic(element, index),
                ]
            )
        }

        function renderBackground(
            element: any,
            index: number,
            options: ContentOptions
        ) {
            return createElement(
                't3-background',
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
            const options: ContentOptions =
                context.props.options.content[element.type]
            return element.appearance.backgroundColor
                ? renderBackground(element, index, options)
                : renderFrame(element, index, options)
        })
    },
})
