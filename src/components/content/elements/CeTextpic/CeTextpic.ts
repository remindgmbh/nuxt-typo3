import { CreateElement, VNode, PropType } from 'vue'

import BaseCe from '../../mixins/BaseCe'
import { Image } from '../../../../api/image'

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
    computed: {
        file(): Image {
            return this.images[0]
        },
    },
    render(createElement: CreateElement): VNode {
        const renderImage = () => {
            return createElement(
                'div',
                {
                    class: [
                        'ce-textpic__image',
                        { 'ce-textpic__image--small': this.ratio === 2 },
                    ],
                },
                this.file
                    ? [
                          createElement('r-image', {
                              props: { file: this.file },
                          }),
                      ]
                    : []
            )
        }

        const renderText = () => {
            return createElement(
                'div',
                {
                    class: [
                        'ce-textpic__text',
                        { 'ce-textpic__text--large': this.ratio === 2 },
                    ],
                },
                [
                    createElement('ce-header', { props: this.$props }),
                    createElement('html-parser', {
                        props: { content: this.bodytext },
                    }),
                ]
            )
        }

        return createElement(
            'div',
            {
                class: 'ce-textpic',
            },
            this.imagePosition === 'left'
                ? [renderImage.call(this), renderText.call(this)]
                : [renderText.call(this), renderImage.call(this)]
        )
    },
})
