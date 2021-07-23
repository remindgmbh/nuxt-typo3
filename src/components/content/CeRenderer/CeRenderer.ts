import Vue, { PropType } from 'vue'
import { Options } from '../../../options'

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
            options: Options,
            container = true
        ) {
            return createElement(
                'ce-frame',
                {
                    props: {
                        ...element.appearance,
                        container,
                    },
                },
                [
                    options.content[element.type]?.wrapper !== undefined &&
                    !options.content[element.type].wrapper
                        ? renderDynamic(element, index)
                        : renderWrapper(element, index),
                ]
            )
        }

        function renderBackground(
            element: any,
            index: number,
            options: Options
        ) {
            return createElement(
                'ce-background',
                {
                    props: element.appearance,
                },
                [
                    renderFrame(
                        element,
                        index,
                        options,
                        !!element.appearance.backgroundWide
                    ),
                ]
            )
        }

        return context.props.content.map((element: any, index) =>
            element.appearance.backgroundColor
                ? renderBackground(element, index, context.props.options)
                : renderFrame(element, index, context.props.options)
        )
    },
})
