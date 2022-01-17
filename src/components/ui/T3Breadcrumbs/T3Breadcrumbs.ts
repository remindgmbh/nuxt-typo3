import Vue, { PropType, VNode } from 'vue'
import { Breadcrumb } from '../../../api'

export default Vue.extend({
    name: 'T3Breadcrumbs',
    functional: true,
    props: {
        items: {
            type: Array as PropType<Breadcrumb[]>,
            required: true,
        },
    },
    render(createElement, context) {
        const items: VNode[] = []
        context.props.items.forEach((item) => {
            items.push(
                createElement(
                    item.current ? 'a' : 'nuxt-link',
                    {
                        class: `t3-breadcrumbs__item${
                            item.current ? ' is-disabled' : ''
                        }`,
                        attrs: item.current ? {} : { to: item.link },
                    },
                    item.title
                )
            )
            if (!item.current) {
                items.push(
                    createElement('span', { class: 't3-breadcrumbs__divider' })
                )
            }
        })

        return createElement('div', { class: 't3-breadcrumbs' }, items)
    },
})
