import Vue, { VueConstructor, CreateElement, VNode } from 'vue'

interface Injectable {
    register: (content: Vue) => void
}

export default (Vue as VueConstructor<Vue & Injectable>).extend({
    name: 'T3ModalContent',
    inject: {
        register: {
            from: 'registerContent',
        },
    },
    props: {
        transitionName: {
            type: String,
            required: false,
            default: 'modal-content-transition',
        },
    },
    data() {
        return {
            visible: false,
        }
    },
    created(): void {
        this.register(this)
        this.$on('set-visible', (value) => (this.visible = value))
    },
    methods: {
        setTransitioning(value: boolean): void {
            this.$emit('set-transitioning', value)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'transition',
            {
                attrs: { name: this.transitionName },
                on: {
                    'before-enter': () => {
                        this.setTransitioning(true)
                    },
                    'after-enter': () => {
                        this.setTransitioning(false)
                    },
                    'enter-cancelled': () => {
                        this.setTransitioning(false)
                    },
                    'before-leave': () => {
                        this.setTransitioning(true)
                    },
                    'leave-cancelled': () => {
                        this.setTransitioning(false)
                    },
                    'after-leave': () => {
                        this.setTransitioning(false)
                    },
                },
            },
            [
                this.visible &&
                    createElement(
                        'div',
                        {
                            class: 't3-modal__content',
                        },
                        this.$slots.default
                    ),
            ]
        )
    },
})
