import Vue, { CreateElement, PropType, VNode } from 'vue'
import { Navigation } from '../../../api'
import RNavigationSidebarItem from './RNavigationSidebarItem'

export default Vue.extend({
    name: 'RNavigationSidebar',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        navigation: {
            type: Object as PropType<Navigation>,
            required: true,
        },
        sidebarClass: {
            type: String,
            required: false,
            default: '',
        },
        transitionName: {
            type: String,
            required: false,
            default: 'navigation-sidebar-transition',
        },
    },
    data() {
        return {
            openSidebars: [] as string[],
        }
    },
    computed: {
        sidebarVisible: {
            get(): boolean {
                return this.value
            },
            set(value: boolean): void {
                this.$emit('input', value)
            },
        },
        sidebars(): Array<{ navItem: Navigation; level: number }> {
            return this.getNavItems(this.navigation)
        },
        rootSidebar(): Navigation {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.sidebars.find((sidebar) => sidebar.level === 0)!.navItem
        },
    },
    watch: {
        sidebarVisible(): void {
            if (this.sidebarVisible) {
                this.openSidebars = [this.rootSidebar.link]
            }
        },
        $route(): void {
            this.sidebarVisible = false
        },
    },
    methods: {
        getNavItems(
            navigation: Navigation,
            result: Array<{ navItem: Navigation; level: number }> = [],
            level = 0
        ): Array<{ navItem: Navigation; level: number }> {
            if (navigation.children) {
                result.push({ navItem: navigation, level })
                navigation.children
                    .filter((child) => child.children)
                    .forEach((child) =>
                        this.getNavItems(child, result, level + 1)
                    )
            }
            return result
        },
        openSidebar(link: string): void {
            this.openSidebars.push(link)
        },
        closeSidebar(link: string): void {
            this.openSidebars.splice(this.openSidebars.indexOf(link), 1)
            if (this.openSidebars.length === 0) {
                this.sidebarVisible = false
            }
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            { class: 'r-navigation-sidebar' },
            this.sidebars.map((sidebar) =>
                createElement(RNavigationSidebarItem, {
                    key: sidebar.navItem.link,
                    class: this.sidebarClass,
                    props: {
                        visible:
                            this.sidebarVisible &&
                            this.openSidebars.includes(sidebar.navItem.link),
                        navigation: sidebar.navItem,
                        transitionName: this.transitionName,
                    },
                    on: {
                        'open-sidebar': this.openSidebar,
                        'close-sidebar': this.closeSidebar,
                    },
                    scopedSlots: {
                        default: ({ items, back }) => [
                            this.$scopedSlots.default?.({
                                items,
                                back,
                                level: sidebar.level,
                                navItem: sidebar.navItem,
                            }),
                        ],
                    },
                })
            )
        )
    },
})
