import Vue, { CreateElement, PropType, VNode } from 'vue'
import RMenuTrigger from './RMenuTrigger'
import RMenuDropdown from './RMenuDropdown'

export default Vue.extend({
    name: 'RMenu',
    provide() {
        return {
            registerDropdown: (
                dropdown: InstanceType<typeof RMenuDropdown>
            ) => {
                this.dropdown = dropdown
                dropdown.$on('close', this.close)
            },
            registerTrigger: (trigger: InstanceType<typeof RMenuTrigger>) => {
                trigger.$on(
                    'toggle',
                    () =>
                        (this.activeItem =
                            this.activeItem === trigger.id ? null : trigger.id)
                )
            },
        }
    },
    props: {
        tag: {
            type: String,
            required: false,
            default: 'div',
        },
        value: {
            type: String as PropType<string | null>,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            activeItem: null as string | null,
            dropdown: null as null | InstanceType<typeof RMenuDropdown>,
        }
    },
    watch: {
        value(value: string | null): void {
            this.activeItem = value
        },
        activeItem(value?: string): void {
            this.dropdown?.$emit('set-active-item', value)
            this.$emit('input', value)
        },
        $route(): void {
            this.close()
        },
    },
    mounted(): void {
        // parent created hook is called before child, but parent mounted hook is called after child
        if (!this.dropdown) {
            console.warn("RMenu doesn't contain RMenuDropdown")
        }
        this.activeItem = this.value
    },
    methods: {
        close(): void {
            this.activeItem = null
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(this.tag, { class: 'r-menu' }, this.$slots.default)
    },
})
