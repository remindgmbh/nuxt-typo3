import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
    name: 'RResponsiveHeightContainer',
    props: {
        tag: {
            type: String,
            required: false,
            default: 'div',
        },
    },
    mounted(): void {
        const container = this.$refs.container as HTMLElement
        const content = this.$refs.content as Element
        const resizeObserver = new ResizeObserver(() => {
            container.style.height = `${content.scrollHeight}px`
        })
        resizeObserver.observe(content)
    },
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
    },
})
