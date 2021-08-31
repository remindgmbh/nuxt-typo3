<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

@Component({
    name: 'RResponsiveHeightContainer',
})
export default class RResponsiveHeightContainer extends Vue {
    @Prop({ type: String, required: false, default: 'div' })
    tag!: string

    mounted(): void {
        const container = this.$refs.container as HTMLElement
        const content = this.$refs.content as Element
        const resizeObserver = new ResizeObserver(() => {
            container.style.height = `${content.scrollHeight}px`
        })
        resizeObserver.observe(content)
    }

    render(createElement: CreateElement): VNode {
        return createElement(
            this.tag,
            {
                ref: 'container',
                class: 'r-responsive-height-container',
            },
            [
                createElement(
                    'div',
                    {
                        ref: 'content',
                        class: 'r-responsive-height-container__content',
                    },
                    this.$slots.default
                ),
            ]
        )
    }
}
</script>

<style lang="scss">
.r-responsive-height-container {
    height: 0;
    overflow: hidden;
}
</style>
