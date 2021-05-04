import { Vue } from 'nuxt-property-decorator'
import BeDynamic from 'nuxt-typo3/lib/templates/layouts/backend/BeDynamic'

export default Vue.extend({
    extends: BeDynamic,
    render(createElement, context) {
        const props: any = context.props
        return createElement(`be-${props.type}`, {
            props: {
                content: props.content,
                breadcrumbs: props.page.breadcrumbs,
            },
        })
    },
})
