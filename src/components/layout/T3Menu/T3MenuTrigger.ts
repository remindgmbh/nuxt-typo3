import Vue, { CreateElement, VNode, VueConstructor } from 'vue'

interface Injectable {
    register: (trigger: Vue) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'T3MenuTrigger',
    inject: {
        register: {
            from: 'registerTrigger',
        },
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: false,
            default: 'button',
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
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
                class: 't3-menu__trigger',
                on: {
                    click: this.toggle,
                },
                attrs: {
                    type: 'button',
                    disabled: this.disabled,
                },
            },
            this.$slots.default
        )
    },
})
