import Vue, { CreateElement, PropType, VNode } from 'vue'
import { Navigation } from '../../../api'

export default Vue.extend({
    name: 'RNavigationSidebarItem',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        navigation: {
            type: Object as PropType<Navigation>,
            required: true,
        },
        transitionName: {
            type: String,
            required: true,
        },
    },
    computed: {
        items(): Array<{ title: string; open?: () => void }> {
            return this.navigation.children.map((child) => ({
                title: child.title,
                open: child.children
                    ? () => this.$emit('open-sidebar', child.link)
                    : undefined,
                link: child.link,
            }))
        },
    },
    methods: {
        back(): void {
            this.$emit('close-sidebar', this.navigation.link)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'transition',
            {
                props: { name: this.transitionName },
            },
            this.visible
                ? this.$scopedSlots.default?.({
                      items: this.items,
                      back: this.back,
                  })
                : []
        )
    },
})
