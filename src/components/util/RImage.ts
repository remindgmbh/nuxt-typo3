import Vue, { PropType, CreateElement, VNode } from 'vue'
import combineURLs from 'axios/lib/helpers/combineURLs'
import { Image } from '../../api'

export default Vue.extend({
    name: 'RImage',
    props: {
        file: {
            type: Object as PropType<Image>,
            required: true,
        },
    },
    render(createElement: CreateElement): VNode {
        const renderImage = () => {
            return createElement('img', {
                attrs: {
                    src: combineURLs(
                        this.$typo3.options.api.baseURL,
                        this.file.properties.originalUrl
                    ),
                    height: this.file.properties.dimensions.height,
                    width: this.file.properties.dimensions.width,
                    alt: this.file.properties.alternative,
                    title: this.file.properties.title,
                },
            })
        }

        return this.file
            ? this.file.properties.link
                ? createElement(
                      'nav-link',
                      { attrs: { to: this.file.properties.link } },
                      [renderImage()]
                  )
                : renderImage()
            : createElement()
    },
})
