import Vue, { PropType } from 'vue'
import { Typolink } from '../../api/typolink'

export default Vue.extend({
    name: 'RTypolink',
    functional: true,
    props: {
        to: {
            type: [String, Object] as PropType<string | Typolink>,
            required: true,
        },
    },
    render(createElement, context) {
        let data: any
        let tag: string
        let url: string
        let target: string

        if (typeof context.props.to === 'string') {
            url = context.props.to
            target = '_blank'
        } else {
            url = context.props.to.url
            target = context.props.to.target
        }

        if (
            typeof context.props.to === 'string' ||
            context.props.to.type !== 'page'
        ) {
            tag = 'a'
            data = {
                attrs: {
                    target,
                    href: url,
                },
            }
        } else {
            tag = 'nuxt-link'
            data = {
                props: {
                    to: url,
                },
                attrs: {
                    target,
                },
            }
        }

        return createElement(
            tag,
            {
                ...context.data,
                ...data,
            },
            context.children
        )
    },
})
