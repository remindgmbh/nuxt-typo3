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
    computed: {
        id(): string {
            return this.item[this.idField]
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'section',
            {
                class: 'r-menu__content',
            },
            this.$scopedSlots.default?.({ item: this.item })
        )
    },
})
