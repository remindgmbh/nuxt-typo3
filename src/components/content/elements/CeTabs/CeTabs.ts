import { CreateElement, VNode } from 'vue'
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
        return createElement('div', { class: 'ce-tabs' }, [
            createElement('CeHeader', { props: this.$props }),
            createElement('RTabs', {
                props: { items: this.items },
                scopedSlots: {
                    title({ item }): string {
                        return item.content.gridElementTitle
                    },
                    content({ item }): VNode {
                        return createElement('CeDynamic', {
                            props: { data: item, type: item.type },
                        })
                    },
                },
            }),
        ])
    },
})
