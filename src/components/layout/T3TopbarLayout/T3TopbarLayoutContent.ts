import Vue, { CreateElement, VNode, VueConstructor } from 'vue'

interface Injectable {
    register: (trigger: Vue) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'T3TopbarLayoutContent',
    inject: {
        register: {
            from: 'registerContent',
        },
    },
    props: {
        tag: {
            type: String,
            required: false,
            default: 'main',
        },
    },
    created(): void {
        this.register(this)
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            this.tag,
            { class: 't3-topbar-layout__content' },
            this.$slots.default
        )
    },
})
