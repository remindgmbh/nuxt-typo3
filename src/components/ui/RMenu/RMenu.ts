import Vue, { CreateElement, PropType, VNode } from 'vue'

export default Vue.extend({
    name: 'RMenu',
    provide() {
        return {
            registerContent: (content: Vue) => {
                content.$emit('setCloseOnClick', this.closeOnClick)
                content.$on('click-outside', this.close)
            },
            registerTrigger: (trigger: Vue) => {
                const key = trigger.$vnode.key as string
                trigger.$on('toggle', () => {
                    this.activeKey = this.activeKey === key ? null : key
                })
            },
        }
    },
    props: {
        tag: {
            type: String,
            required: false,
            default: 'div',
        },
        closeOnClick: {
            type: Boolean,
            required: false,
            default: false,
        },
        value: {
            type: String as PropType<string | null>,
            required: false,
            default: null,
        },
    },
    computed: {
        activeKey: {
            get(): string | null {
                return this.value
            },
            set(value: string | null) {
                this.$emit('input', value)
            },
        },
    },
    watch: {
        $route(): void {
            this.close()
        },
    },
    methods: {
        close(): void {
            this.activeKey = null
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(this.tag, { class: 'r-menu' }, this.$slots.default)
    },
})
