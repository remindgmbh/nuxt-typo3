import { directive as vClickOutside } from 'v-click-outside'
import Vue, { CreateElement, VNode, VueConstructor } from 'vue'

interface Injectable {
    register: (dropdown: Vue) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'RMenuDropdown',
    inject: {
        register: {
            from: 'registerDropdown',
        },
    },
    props: {
        closeOnOutsideClick: {
            type: Boolean,
            required: false,
            default: false,
        },
        transitionName: {
            type: String,
            required: false,
            default: 'menu-content-change',
        },
        transitionMode: {
            type: String,
            required: false,
            default: 'out-in',
        },
        idField: {
            type: String,
            required: false,
            default: 'id',
        },
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeItem: null as string | null,
        }
    },
    computed: {
        visible(): boolean {
            return !!this.activeItem
        },
    },
    watch: {
        visible(value: boolean) {
            if (this.closeOnOutsideClick) {
                if (value) {
                    this.$nextTick(() => {
                        vClickOutside.bind(this.$el, {
                            value: this.close,
                        })
                    })
                } else {
                    vClickOutside.unbind(this.$el)
                }
            }
        },
    },
    created(): void {
        this.register(this)
        this.$on(
            'set-active-item',
            (item: string | null) => (this.activeItem = item)
        )
    },
    methods: {
        close(): void {
            this.$emit('close')
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'nav',
            {
                class: 'r-menu__dropdown',
            },
            [
                createElement(
                    'transition',
                    {
                        props: {
                            name: this.transitionName,
                            mode: this.transitionMode,
                        },
                    },
                    this.items.map((item: any) =>
                        this.activeItem === item[this.idField]
                            ? createElement('r-menu-content', {
                                  key: item[this.idField],
                                  props: { item, idField: this.idField },
                                  scopedSlots: {
                                      default: ({ item }) =>
                                          this.$scopedSlots.default?.({
                                              item,
                                          }),
                                  },
                              })
                            : createElement()
                    )
                ),
            ]
        )
    },
})
