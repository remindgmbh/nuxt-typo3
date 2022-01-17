import { CreateElement, VNode } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import './T3CeTabs.scss'

export default BaseCe.extend({
    name: 'T3CeTabs',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    render(createElement: CreateElement): VNode {
        const type = this.type
        return createElement('div', { class: 't3-ce-tabs' }, [
            createElement('ce-header', { props: this.$props }),
            createElement('t3-tabs', {
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
