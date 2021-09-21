import Vue, { CreateElement, VNode } from 'vue'

import { ScrollIndicator } from '../../../util/scroll-indicator'

export default Vue.extend({
    name: 'RTopbarLayout',
    props: {
        scrollbarDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            scrollPosition: 0,
            top: true,
        }
    },
    computed: {
        content(): HTMLElement {
            return this.$refs.content as HTMLElement
        },
    },
    watch: {
        scrollbarDisabled(): void {
            if (this.scrollbarDisabled) {
                this.scrollPosition = pageYOffset
                this.content.style.top = `${-this.scrollPosition}px`
                this.content.style.position = 'fixed'
            } else {
                this.content.style.position = ''
                this.content.style.top = '0'
                window.scrollTo({ top: this.scrollPosition })
            }
        },
    },
    mounted() {
        const scrollIndicator = new ScrollIndicator({
            content: document.body,
            direction: 'top',
        })

        scrollIndicator.watch((detached) => {
            if (this.content.style.position !== 'fixed') {
                this.top = !detached
            }
        })
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            {
                class: [
                    'r-topbar-layout',
                    { 'r-topbar-layout--dense': !this.top },
                ],
            },
            [
                createElement('header', { class: 'r-topbar-layout__bar' }, [
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.$scopedSlots.bar!({ expanded: this.top }),
                ]),
                createElement(
                    'main',
                    { class: 'r-topbar-layout__content', ref: 'content' },
                    [
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.$scopedSlots.content!({ expanded: !this.top }),
                    ]
                ),
            ]
        )
    },
})
