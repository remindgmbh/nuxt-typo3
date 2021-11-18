import { CreateElement, VNode } from 'vue'

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
                        return item.title
                    },
                    content({ item }): VNode {
                        return createElement('ce-text', {
                            props: { ...item, bodytext: item.bodytext },
                        })
                    },
                },
            }),
        ])
    },
})
