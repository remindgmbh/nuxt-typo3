import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'

@Component({
    name: 'CeTextpic',
})
export default class CeTextpic extends mixins(baseCe) {
    @Prop({ type: Object, required: true, default: () => {} })
    gallery!: any

    @Prop({ type: String, required: true, default: '' })
    bodytext!: string

    @Prop({ type: Number, required: true, default: 1 })
    ratio!: number

    get file(): any {
        return this.gallery.rows[1]?.columns[1]
    }

    get position(): 'left' | 'right' {
        return this.gallery.position.horizontal
    }

    render(createElement: CreateElement): VNode {
        const renderImage = () => {
            return createElement(
                'div',
                { class: 'ce-textpic__image' },
                this.file
                    ? [
                          createElement('media-image', {
                              attrs: { file: this.file },
                          }),
                      ]
                    : []
            )
        }

        const renderText = () => {
            return createElement('div', { class: 'ce-textpic__text' }, [
                createElement('ce-header', { props: this.$props }),
                createElement('html-parser', {
                    attrs: { content: this.bodytext },
                }),
            ])
        }

        return createElement(
            'div',
            {
                class: [
                    'ce-textpic',
                    { 'ce-textpic--1-1': this.ratio === 1 },
                    { 'ce-textpic--2-1': this.ratio === 2 },
                ],
            },
            this.position === 'left'
                ? [renderImage.call(this), renderText.call(this)]
                : [renderText.call(this), renderImage.call(this)]
        )
    }
}
