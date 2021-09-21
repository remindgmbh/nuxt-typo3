import { PropType, VNode, CreateElement } from 'vue'
import CeDynamic from 'nuxt-typo3/lib/templates/components/content/CeDynamic'
import { BaseCe } from '../../..'
import { Structure } from '../../../../api'

export default BaseCe.extend({
    name: 'CeStructuredContent',
    props: {
        structure: {
            type: Object as PropType<Structure>,
            required: true,
        },
    },
    computed: {
        data(): unknown {
            return {
                id: this.id,
                type: this.structure.layout,
                content: {
                    items: this.items,
                    header: this.header,
                    headerLayout: this.headerLayout,
                    headerPosition: this.headerPosition,
                    headerLink: this.headerLink,
                    subheader: this.subheader,
                },
            }
        },
        items(): unknown[] {
            const rows = this.structure.rows || []
            const columns = rows.length > 0 ? rows[0].columns : []
            return columns.length > 0 ? columns[0].elements : []
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(CeDynamic, {
            props: { data: this.data, type: this.structure.layout },
        })
    },
})
