import Vue, { CreateElement, VNode } from 'vue'
import './T3ResponsiveHeightContainer.scss'

export default Vue.extend({
    name: 'T3ResponsiveHeightContainer',
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
                class: 't3-responsive-height-container',
            },
            [
                createElement(
                    'div',
                    {
                        ref: 'content',
                        class: 't3-responsive-height-container__content',
                    },
                    this.$slots.default
                ),
            ]
        )
    },
})
