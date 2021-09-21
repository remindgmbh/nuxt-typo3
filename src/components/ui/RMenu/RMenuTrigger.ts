import Vue, { CreateElement, VNode, VueConstructor } from 'vue'

interface Injectable {
    register: (trigger: any) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'RMenuTrigger',
    inject: {
        register: {
            from: 'registerTrigger',
        },
    },
    props: {
        tag: {
            type: String,
            required: false,
            default: 'button',
        },
    },
    created(): void {
        this.register(this)
    },
    methods: {
        toggle(event: Event): void {
            event.stopPropagation()
            this.$emit('toggle')
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            this.tag,
            {
                class: 'r-menu__trigger',
                on: {
                    click: this.toggle,
                },
                attrs: {
                    type: 'button',
                },
            },
            this.$slots.default
        )
    },
})
