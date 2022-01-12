import { CreateElement, VNode, PropType } from 'vue'

import BaseCe from '../../mixins/BaseCe'
import { Image } from '../../../../api'

export default BaseCe.extend({
    name: 'CeTextpic',
    props: {
        images: {
            type: Array as PropType<Image[]>,
            required: true,
            default: () => [],
        },
        bodytext: {
            type: String,
            required: true,
            default: '',
        },
        ratio: {
            type: Number,
            required: true,
            default: 1,
        },
        imagePosition: {
            type: String as PropType<'left' | 'right'>,
            required: true,
            default: 'left',
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('ce-textmedia', {
            props: {
                assets: this.images,
                assetPosition: this.imagePosition,
                ...this.$props,
            },
        })
    },
})
