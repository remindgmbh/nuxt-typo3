import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Image } from '../../../../api/image'

@Component({
    name: 'CeTextpic',
})
export default class CeTextpic extends mixins(baseCe) {
    @Prop({ type: Array, required: true, default: () => [] })
    images!: Image[]

    @Prop({ type: Object, required: true, default: () => {} })
    gallery!: any

    @Prop({ type: String, required: true, default: '' })
    bodytext!: string

    @Prop({ type: Number, required: true, default: 1 })
    ratio!: number

    get file(): Image {
        return this.images[0]
    }

    get position(): 'left' | 'right' {
        return this.gallery.position.horizontal
    }

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
                          createElement('media-image', {
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
            this.position === 'left'
                ? [renderImage.call(this), renderText.call(this)]
                : [renderText.call(this), renderImage.call(this)]
        )
    }
}
