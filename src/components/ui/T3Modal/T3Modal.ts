import Vue, { CreateElement, VNode } from 'vue'
import T3ModalBackground from './T3ModalBackground'
import { T3ModalContent } from '.'
import './T3Modal.scss'

export default Vue.extend({
    name: 'T3Modal',
    provide() {
        return {
            registerBackground: (
                background: InstanceType<typeof T3ModalBackground>
            ) => {
                this.background = background
                if (this.closeOnOutsideClick) {
                    background.$on('close', this.close)
                }
                background.$on(
                    'set-transitioning',
                    (value) => (this.backgroundTransitioning = value)
                )
            },
            registerContent: (content: InstanceType<typeof T3ModalContent>) => {
                this.content = content
                content.$on(
                    'set-transitioning',
                    (value) => (this.contentTransitioning = value)
                )
            },
        }
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        closeOnOutsideClick: {
            type: Boolean,
            required: false,
            default: false,
        },
        transitionName: {
            type: String,
            required: false,
            default: 'modal-transition',
        },
        backgroundTransitionName: {
            type: String,
            required: false,
            default: 'modal-background-transition',
        },
    },
    data() {
        return {
            background: null as InstanceType<typeof T3ModalBackground> | null,
            backgroundTransitioning: false,
            content: null as InstanceType<typeof T3ModalContent> | null,
            contentTransitioning: false,
        }
    },
    computed: {
        transitioning(): boolean {
            return this.contentTransitioning || this.backgroundTransitioning
        },
    },
    watch: {
        value(): void {
            this.background?.$emit('set-visible', this.value)
            this.content?.$emit('set-visible', this.value)
        },
    },
    methods: {
        close(): void {
            this.$emit('input', false)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            {
                class: [
                    't3-modal',
                    {
                        't3-modal--visible': this.value || this.transitioning,
                        't3-modal--transitioning': this.transitioning,
                    },
                ],
            },
            this.$slots.default
        )
    },
})
