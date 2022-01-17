import Vue, { CreateElement, VNode } from 'vue'
import T3TopbarLayoutContent from './T3TopbarLayoutContent'
import T3TopbarLayoutHeader from './T3TopbarLayoutHeader'
import T3TopbarLayoutSidebar from './T3TopbarLayoutSidebar'
import './T3TopbarLayout.scss'

export default Vue.extend({
    name: 'T3TopbarLayout',
    provide() {
        return {
            registerHeader: (
                header: InstanceType<typeof T3TopbarLayoutHeader>
            ) => {
                this.header = header
            },
            registerContent: (
                content: InstanceType<typeof T3TopbarLayoutContent>
            ) => {
                this.content = content
            },
            registerSidebar: (
                sidebar: InstanceType<typeof T3TopbarLayoutSidebar>
            ) => {
                this.sidebar = sidebar
            },
        }
    },
    props: {
        scrollbarDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            content: null as null | InstanceType<typeof T3TopbarLayoutContent>,
            header: null as null | InstanceType<typeof T3TopbarLayoutHeader>,
            sidebar: null as null | InstanceType<typeof T3TopbarLayoutSidebar>,
            scrollPosition: 0,
            initialPosition: 'initial',
            initialTop: 'initial',
            initialMinHeight: 'initial',
            initialHeight: 'initial',
            initialMaxHeight: 'initial',
            initialOverflow: 'initial',
        }
    },
    computed: {
        headerElement(): HTMLElement {
            return this.header?.$el as HTMLElement
        },
        contentElement(): HTMLElement {
            return this.content?.$el as HTMLElement
        },
        isScrollable(): boolean {
            const computedStyle = window.getComputedStyle(this.$el)
            return (
                computedStyle.overflow === 'auto' ||
                computedStyle.overflow === 'scroll' ||
                computedStyle.overflowY === 'auto' ||
                computedStyle.overflowY === 'scroll'
            )
        },
    },
    watch: {
        scrollbarDisabled(): void {
            this.toggleScrollbar(!this.scrollbarDisabled)
        },
    },
    mounted() {
        if (!this.contentElement || !this.headerElement) {
            console.warn('Header or Content missing!')
        }

        this.initialPosition = this.contentElement.style.position
        this.initialTop = this.contentElement.style.top
        this.initialMinHeight = this.contentElement.style.minHeight
        this.initialHeight = this.contentElement.style.height
        this.initialMaxHeight = this.contentElement.style.maxHeight
        this.initialOverflow = this.contentElement.style.overflow

        this.sidebar?.$on('toggle-scrollbar', this.toggleScrollbar)
    },
    methods: {
        toggleScrollbar(enable: boolean): void {
            const container = this.$el as HTMLElement

            if (enable) {
                this.contentElement.style.overflow = this.initialOverflow
                this.contentElement.style.top = this.initialTop
                this.contentElement.style.position = this.initialPosition
                this.contentElement.style.minHeight = this.initialMinHeight
                this.contentElement.style.height = this.initialHeight
                this.contentElement.style.maxHeight = this.initialMaxHeight
                ;(this.isScrollable ? this.$el : window).scrollTo({
                    top: this.scrollPosition,
                })
            } else {
                this.contentElement.style.position = 'absolute'

                const headerHeight = this.headerElement.scrollHeight
                const containerHeight = container.clientHeight

                this.scrollPosition = this.isScrollable
                    ? this.$el.scrollTop
                    : scrollY

                const contentHeight =
                    containerHeight - headerHeight + this.scrollPosition

                this.contentElement.style.minHeight = `${contentHeight}px`
                this.contentElement.style.height = `${contentHeight}px`
                this.contentElement.style.maxHeight = `${contentHeight}px`

                this.contentElement.style.top = `${
                    headerHeight - this.scrollPosition
                }px`
                this.contentElement.style.overflow = 'hidden'
            }
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            {
                class: 't3-topbar-layout',
            },
            this.$slots.default
        )
    },
})
