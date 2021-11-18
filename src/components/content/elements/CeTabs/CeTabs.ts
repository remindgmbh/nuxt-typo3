import { CreateElement, VNode } from 'vue'
import { CeHeader, RTabs } from '../../..'
import BaseCe from '../../mixins/BaseCe'

export default BaseCe.extend({
    name: 'CeTabs',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    render(createElement: CreateElement): VNode {
        const type = this.type
        return createElement('div', { class: 'ce-tabs' }, [
            createElement(CeHeader, { props: this.$props }),
            createElement(RTabs, {
                props: { items: this.items },
                scopedSlots: {
                    title({ item }): string {
                        return item.title
                    },
                    content({ item }): VNode {
                        return createElement('ce-text', {
                            props: { ...item, bodytext: item.bodytext, type },
                        })
                    },
                },
            }),
        ])
    },
})
