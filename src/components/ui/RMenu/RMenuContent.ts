import { directive as vClickOutside } from 'v-click-outside'
import Vue, { CreateElement, VNode, VueConstructor } from 'vue'
import { RResponsiveHeightContainer } from '..'

interface Injectable {
    register: (trigger: any) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'RMenuContent',
    inject: {
        register: {
            from: 'registerContent',
        },
    },
    data() {
        return {
            closeOnClick: false,
        }
    },
    created(): void {
        this.$on(
            'setCloseOnClick',
            (value: boolean) => (this.closeOnClick = value)
        )
        this.register(this)
    },
    mounted(): void {
        if (this.closeOnClick) {
            vClickOutside.bind(this.$el, { value: this.onClickOutside })
        }
    },
    methods: {
        onClickOutside(event: Event): void {
            this.$emit('click-outside', event)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            RResponsiveHeightContainer,
            {
                class: 'r-menu__content',
                props: {
                    tag: 'nav',
                },
            },
            this.$slots.default
        )
    },
})
