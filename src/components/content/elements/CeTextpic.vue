<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Image } from '../../../api/image'

@Component({
    name: 'CeTextpic',
})
export default class CeTextpic extends mixins(baseCe) {
    @Prop({ type: Array, required: true, default: () => [] })
    images!: Image[]

    @Prop({ type: String, required: true, default: '' })
    bodytext!: string

    @Prop({ type: Number, required: true, default: 1 })
    ratio!: number

    @Prop({ type: String, required: true, default: 'left' })
    imagePosition!: 'left' | 'right'

    get file(): Image {
        return this.images[0]
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
    }
}
</script>
<style lang="scss">
.ce-textpic {
    display: flex;
    flex-wrap: wrap;

    &__image {
        width: 50%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }

        &--small {
            width: calc(1 / 3 * 100%);
        }
    }

    &__text {
        width: 50%;
        padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        box-sizing: border-box;

        &--large {
            width: calc(2 / 3 * 100%);
        }
    }
}
</style>
