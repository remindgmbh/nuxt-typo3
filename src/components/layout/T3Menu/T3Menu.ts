import Vue, { CreateElement, PropType, VNode } from 'vue'
import T3MenuTrigger from './T3MenuTrigger'
import T3MenuDropdown from './T3MenuDropdown'

export default Vue.extend({
    name: 'T3Menu',
    provide() {
        return {
            registerDropdown: (
                dropdown: InstanceType<typeof T3MenuDropdown>
            ) => {
                this.dropdown = dropdown
                dropdown.$on('close', this.close)
            },
            registerTrigger: (trigger: InstanceType<typeof T3MenuTrigger>) => {
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
            dropdown: null as null | InstanceType<typeof T3MenuDropdown>,
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
            console.warn("T3Menu doesn't contain T3MenuDropdown")
        }
        this.activeItem = this.value
    },
    methods: {
        close(): void {
            this.activeItem = null
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            this.tag,
            { class: 't3-menu' },
            this.$slots.default
        )
    },
})
