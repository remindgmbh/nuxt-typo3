import { CreateElement, PropType, VNode } from 'vue'
import { Image } from '../../../api'
import BaseCe from '../../../mixins/components/BaseCe'
// import './T3CeImage.scss'

export default BaseCe.extend({
    name: 'T3CeImage',
    props: {
        images: {
            type: Array as PropType<Image[]>,
            required: true,
            default: () => [],
        },
    },
    computed: {
        file(): Image {
            return this.images[0]
        },
    },
    render(createElement: CreateElement): VNode {
        const renderHeader = () =>
            createElement('ce-header', { props: this.$props })

        return createElement(
            'div',
            { class: 'ce-image' },
            this.file
                ? [
                      renderHeader.call(this),
                      createElement('t3-image', {
                          props: { file: this.file },
                      }),
                  ]
                : [renderHeader.call(this)]
        )
    },
})
