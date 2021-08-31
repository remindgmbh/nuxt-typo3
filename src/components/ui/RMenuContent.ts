import { Vue, Component, Inject } from 'vue-property-decorator'
import { directive as vClickOutside } from 'v-click-outside'
import { CreateElement, VNode } from 'vue'

@Component({
    name: 'RMenuContents',
})
export default class RMenuContents extends Vue {
    private closeOnClick = false

    @Inject({ from: 'registerContents' })
    register!: (trigger: RMenuContents) => void

    created(): void {
        this.$on(
            'setCloseOnClick',
            (value: boolean) => (this.closeOnClick = value)
        )
        this.register(this)
    }

    mounted(): void {
        if (this.closeOnClick) {
            vClickOutside.bind(this.$el, { value: this.onClickOutside })
        }
    }

    onClickOutside(event: Event): void {
        this.$emit('click-outside', event)
    }

    render(createElement: CreateElement): VNode {
        return createElement(
            'RResponsiveHeightContainer',
            {
                class: 'r-menu__content',
                props: {
                    tag: 'nav',
                },
            },
            this.$slots.default
        )
    }
}
