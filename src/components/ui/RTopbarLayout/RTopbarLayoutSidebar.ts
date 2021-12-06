import Vue, { CreateElement, VNode, VueConstructor } from 'vue'

interface Injectable {
    register: (trigger: Vue) => void
}

enum Status {
    Entering,
    Leaving,
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'RTopbarLayoutSidebar',
    inject: {
        register: {
            from: 'registerSidebar',
        },
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        tag: {
            type: String,
            required: false,
            default: 'nav',
        },
        transitionName: {
            type: String,
            required: false,
            default: 'sidebar-transition',
        },
    },
    data() {
        return {
            status: Status.Entering,
        }
    },
    created(): void {
        this.register(this)
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'transition',
            {
                props: { name: this.transitionName },
                on: {
                    'before-enter': () => {
                        if (this.status !== Status.Leaving) {
                            this.$emit('toggle-scrollbar', false)
                        }
                        this.status = Status.Entering
                    },
                    'before-leave': () => {
                        this.status = Status.Leaving
                    },
                    'after-leave': () => {
                        if (this.status === Status.Leaving) {
                            this.$emit('toggle-scrollbar', true)
                            this.status = Status.Entering
                        }
                    },
                },
            },
            this.value
                ? [
                      createElement(
                          this.tag,
                          { class: 'r-topbar-layout__sidebar' },
                          this.$scopedSlots.default?.({
                              close: () => this.$emit('input', false),
                          })
                      ),
                  ]
                : []
        )
    },
})
