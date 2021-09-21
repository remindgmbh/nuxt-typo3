import { CreateElement, VNode } from 'vue'

import CeDynamic from 'nuxt-typo3/lib/templates/components/content/CeDynamic'
import { CeHeader, RAccordion } from '../../..'
import BaseCe from '../../mixins/BaseCe'

export default BaseCe.extend({
    name: 'CeAccordion',
    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('div', { class: 'ce-accordion' }, [
            createElement(CeHeader, { props: this.$props }),
            createElement(RAccordion, {
                props: {
                    items: this.items,
                },
                scopedSlots: {
                    title({ item }): string {
                        return item.content.gridElementTitle
                    },
                    content({ item }): VNode {
                        return createElement(CeDynamic, {
                            props: { data: item, type: item.type },
                        })
                    },
                },
            }),
        ])
    },
})
