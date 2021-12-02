import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
    name: 'RMenuContent',
    props: {
        idField: {
            type: String,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'section',
            {
                key: this.item[this.idField],
                class: 'r-menu__content',
            },
            this.$scopedSlots.default?.({ item: this.item })
        )
    },
})
