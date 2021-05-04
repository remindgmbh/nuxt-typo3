import Vue from 'vue'

export default Vue.extend({
    name: 'CeRenderer',
    functional: true,
    props: {
        multiColumn: {
            type: Boolean,
            required: false,
            default: false,
        },
        content: {
            type: Array,
            default: () => [],
        },
    },
    render(createElement, context) {
        function renderBackground(element: any, index: number) {
            return createElement(
                'ce-background',
                {
                    props: element.appearance,
                },
                [renderFrame(element, index)]
            )
        }

        function renderFrame(element: any, index: number) {
            return createElement('ce-frame', { props: element.appearance }, [
                createElement(
                    'ce-wrapper',
                    {
                        props: element.appearance,
                    },
                    [
                        createElement('ce-dynamic', {
                            props: {
                                data: element,
                                type: element.type,
                                index,
                            },
                        }),
                    ]
                ),
            ])
        }

        return context.props.content.map((element: any, index) =>
            element.appearance.background
                ? renderBackground(element, index)
                : renderFrame(element, index)
        )
    },
})
