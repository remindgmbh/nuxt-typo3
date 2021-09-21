import { CreateElement, PropType, VNode } from 'vue'

import { Image } from '../../../../api'
import { BaseCe, CeHeader, RImage } from '../../..'

export default BaseCe.extend({
    name: 'CeImage',
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
            createElement(CeHeader, { props: this.$props })

        return createElement(
            'div',
            { class: 'ce-image' },
            this.file
                ? [
                      renderHeader.call(this),
                      createElement(RImage, {
                          props: { file: this.file },
                      }),
                  ]
                : [renderHeader.call(this)]
        )
    },
})
