import Vue, { CreateElement, VNode } from 'vue'
import './T3ScrollIndicator.scss'

const TOP = 'top'
const RIGHT = 'right'
const BOTTOM = 'bottom'
const LEFT = 'left'

// Move bounding box for intersection test next to the actual content
// to detect scrolls to the very end.
const ROOT_MARGINS = {
    [TOP]: '100% 0px -100% 0px',

    // Content with auto or percentage width can contain subpixels.
    // This can lead to IntersectionObserver not detecting scrolls to the right,
    // because less than a pixel is missing to intersect. So instead of moving
    // the left margin 100% to the right 101% will be used.
    [RIGHT]: '0px 100% 0px -101%',
    [BOTTOM]: '-100% 0px 100% 0px',
    [LEFT]: '0px -100% 0px 100%',
}

export default Vue.extend({
    name: 'T3ScrollIndicator',
    props: {
        top: {
            type: Boolean,
            required: false,
            default: false,
        },
        right: {
            type: Boolean,
            required: false,
            default: false,
        },
        bottom: {
            type: Boolean,
            required: false,
            default: false,
        },
        left: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            detached: {
                [TOP]: false,
                [RIGHT]: false,
                [BOTTOM]: false,
                [LEFT]: false,
            },
        }
    },
    mounted(): void {
        const directions = {
            [TOP]: this.top,
            [RIGHT]: this.right,
            [BOTTOM]: this.bottom,
            [LEFT]: this.left,
        }
        Object.keys(directions)
            .filter((direction) => directions[direction])
            .forEach((direction) => {
                this.createIntersectionObserver(direction)
            })
    },
    methods: {
        createIntersectionObserver(direction: string): void {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        this.detached[direction] = entry.intersectionRatio !== 0
                    })
                },
                {
                    root: this.$refs.viewport as HTMLElement,
                    rootMargin: ROOT_MARGINS[direction],
                    threshold: [0, Number.MIN_VALUE],
                }
            )
            io.observe(this.$refs.content as HTMLElement)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('div', { class: 't3-scroll-indicator' }, [
            createElement(
                'div',
                {
                    class: 't3-scroll-indicator__viewport',
                    ref: 'viewport',
                },
                [
                    createElement(
                        'div',
                        {
                            class: 't3-scroll-indicator__content',
                            ref: 'content',
                        },
                        [this.$slots.default]
                    ),
                ]
            ),
            this.$scopedSlots.top?.({ visible: this.detached[TOP] }),
            this.$scopedSlots.right?.({ visible: this.detached[RIGHT] }),
            this.$scopedSlots.bottom?.({ visible: this.detached[BOTTOM] }),
            this.$scopedSlots.left?.({ visible: this.detached[LEFT] }),
        ])
    },
})
