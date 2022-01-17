import { Portal } from '@linusborg/vue-simple-portal'
import Vue, { CreateElement, VNode } from 'vue'
import './T3Modal.scss'

export default Vue.extend({
    name: 'T3Modal',
    components: { Portal },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        transitionName: {
            type: String,
            required: false,
            default: 'modal-transition',
        },
    },
    render(createElement: CreateElement): VNode {
        //     <!--
        //         https://github.com/LinusBorg/vue-simple-portal
        //         use vue-simple-portal to render modal as direct child of body to allow positioning over header
        //      -->
        return createElement(Portal, [
            createElement(
                'transition',
                {
                    attrs: { name: this.transitionName },
                },
                [
                    this.value
                        ? createElement(
                              'div',
                              { class: 't3-modal' },
                              this.$slots.default
                          )
                        : undefined,
                ]
            ),
        ])
    },
})
