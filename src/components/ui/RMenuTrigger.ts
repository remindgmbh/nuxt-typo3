import { Vue, Component, Inject, Prop } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

@Component({
    name: 'RMenuTrigger',
})
export default class RMenuTrigger extends Vue {
    @Prop({ type: String, required: false, default: 'button' })
    tag!: string

    @Inject({ from: 'registerTrigger' })
    register!: (trigger: RMenuTrigger) => void

    created(): void {
        this.register(this)
    }

    toggle(event: Event): void {
        event.stopPropagation()
        this.$emit('toggle')
    }

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
    }
}
