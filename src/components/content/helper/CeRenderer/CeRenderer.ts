import Vue, { PropType } from 'vue'
import CeDynamic from 'nuxt-typo3/lib/templates/components/content/CeDynamic'
import { ContentOptions, Options } from '../../../../options'
import { CeBackground, CeFrame, CeWrapper } from './..'

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
                CeWrapper,
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
                CeFrame,
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
                CeBackground,
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
