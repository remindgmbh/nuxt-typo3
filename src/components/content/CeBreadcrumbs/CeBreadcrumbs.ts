import Vue, { PropType, VNode } from 'vue'
import { Breadcrumb } from '../../../api/breadcrumb'

export default Vue.extend({
    name: 'CeBreadcrumbs',
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
                        class: `ce-breadcrumbs__item${
                            item.current ? ' is-disabled' : ''
                        }`,
                        attrs: item.current ? {} : { to: item.link },
                    },
                    item.title
                )
            )
            if (!item.current) {
                items.push(
                    createElement('span', { class: 'ce-breadcrumbs__divider' })
                )
            }
        })

        return createElement('div', { class: 'ce-breadcrumbs' }, items)
    },
})
