import Vue, { PropType, VNode, CreateElement } from 'vue'
import VueSimpleSuggest from 'vue-simple-suggest'

export default Vue.extend({
    name: 'FormulateInputSuggest',
    props: {
        context: {
            type: Object as PropType<any>,
            required: true,
        },
        list: {
            type: [Array, Function] as PropType<
                | string[]
                | ((value: string) => string[])
                | ((value: string) => Promise<string[]>)
            >,
            required: true,
        },
        top: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            {
                class: `formulate-input-element formulate-input-element--${this.context.classification}`,
                props: {
                    dataType: this.context.type,
                },
            },
            [
                createElement(VueSimpleSuggest, {
                    on: {
                        input: (value: string) => {
                            // eslint-disable-next-line vue/no-mutating-props
                            this.context.model = value
                        },
                    },
                    class: { top: this.top },
                    props: {
                        list: this.list,
                        'display-attribute': '.',
                    },
                    attrs: {
                        value: this.context.model,
                        ...this.context.attributes,
                    },
                }),
            ]
        )
    },
})
