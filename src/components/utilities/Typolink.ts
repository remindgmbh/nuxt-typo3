import Vue, { PropType } from 'vue'
import { Typolink } from '../../api/typolink'

export default Vue.extend({
    name: 'Typolink',
    functional: true,
    props: {
        to: {
            type: [String, Object] as PropType<string | Typolink>,
            required: true,
        },
    },
    render(createElement, context) {
        const tag =
            typeof context.props.to === 'string' ||
            context.props.to.type !== 'page'
                ? 'a'
                : 'nuxt-link'

        const linkAttrName = tag === 'a' ? 'href' : 'to'

        return createElement(
            tag,
            {
                attrs: {
                    [linkAttrName]:
                        typeof context.props.to === 'string'
                            ? context.props.to
                            : context.props.to.url,
                    target:
                        typeof context.props.to === 'string'
                            ? '_blank'
                            : context.props.to.target,
                },
                ...context.data,
            },
            context.children
        )
    },
})
