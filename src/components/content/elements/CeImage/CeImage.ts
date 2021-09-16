import { CreateElement, PropType, VNode } from 'vue'

import BaseCe from '../../mixins/BaseCe'
import { Image } from '../../../../api/image'

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
            createElement('ce-header', { props: this.$props })

        return createElement(
            'div',
            { class: 'ce-image' },
            this.file
                ? [
                      renderHeader.call(this),
                      createElement('r-image', {
                          props: { file: this.file },
                      }),
                  ]
                : [renderHeader.call(this)]
        )
    },
})
