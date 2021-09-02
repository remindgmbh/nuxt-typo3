<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Image } from '../../../api/image'

@Component({
    name: 'CeImage',
})
export default class CeImage extends mixins(baseCe) {
    @Prop({ type: Array, required: true, default: () => [] })
    images!: Image[]

    get file(): Image {
        return this.images[0]
    }

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
    }
}
</script>
<style lang="scss">
.ce-image {
    .ce-header {
        padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}
</style>
