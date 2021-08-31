<script lang="ts">
import { Vue, Component, Provide, Prop, Watch } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'
import RMenuContent from './RMenuContent'
import RMenuTrigger from './RMenuTrigger'

@Component({
    name: 'RMenu',
})
export default class RMenu extends Vue {
    @Prop({ type: String, required: false, default: 'div' })
    tag!: string

    @Prop({ type: Boolean, required: false, default: false })
    closeOnClick!: boolean

    @Prop({ type: String, required: false, default: undefined })
    value!: string | null

    get activeKey(): string | null {
        return this.value
    }

    set activeKey(value: string | null) {
        this.$emit('input', value)
    }

    @Provide()
    registerTrigger(trigger: RMenuTrigger): void {
        const key = trigger.$vnode.key as string

        trigger.$on('toggle', () => {
            this.activeKey = this.activeKey === key ? null : key
        })
    }

    @Provide()
    registerContents(content: RMenuContent): void {
        content.$emit('setCloseOnClick', this.closeOnClick)
        content.$on('click-outside', this.close)
    }

    close(): void {
        this.activeKey = null
    }

    @Watch('$route')
    onRouteChanged(): void {
        this.close()
    }

    render(createElement: CreateElement): VNode {
        return createElement(
            this.tag,
            { class: 'r-menu' },
            this.$scopedSlots.default
                ? this.$scopedSlots.default({
                      activeKey: this.activeKey,
                  })
                : []
        )
    }
}
</script>
<style lang="scss">
.r-menu {
    &__content {
        position: absolute;
        width: 100%;
        top: 100%;
    }

    &__trigger {
        cursor: pointer;
    }
}
</style>
