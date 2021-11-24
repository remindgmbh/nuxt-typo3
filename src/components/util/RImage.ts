import Vue, { PropType } from 'vue'
import { Image } from '../../api'

export default Vue.extend({
    name: 'RImage',
    functional: true,
    props: {
        file: {
            type: Object as PropType<Image>,
            required: true,
        },
    },
    render(createElement, context) {
        function renderImage() {
            return createElement('img', {
                attrs: {
                    src: context.props.file.publicUrl,
                    height: context.props.file.properties.dimensions.height,
                    width: context.props.file.properties.dimensions.width,
                    alt: context.props.file.properties.alternative,
                    title: context.props.file.properties.title,
                },
            })
        }

        return context.props.file
            ? context.props.file.properties.link
                ? createElement(
                      'nav-link',
                      { attrs: { to: context.props.file.properties.link } },
                      [renderImage()]
                  )
                : renderImage()
            : createElement()
    },
})
