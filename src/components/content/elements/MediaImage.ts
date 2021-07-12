import Vue from 'vue'

export default Vue.extend({
    name: 'MediaImage',
    functional: true,
    props: {
        file: {
            type: Object,
            required: true,
            default: () => {},
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

        return context.props.file.properties.link
            ? createElement(
                  'nuxt-link',
                  { attrs: { to: context.props.file.properties.link } },
                  [renderImage()]
              )
            : renderImage()
    },
})
