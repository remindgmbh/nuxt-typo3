import Vue, { CreateElement, PropType, VNode } from 'vue'
import { CollapseTransition } from '../..'

export default Vue.extend({
    name: 'RAccordion',
    props: {
        items: {
            type: Array,
            required: true,
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false,
        },
        initialActiveItems: {
            type: Array as PropType<number[]>,
            required: false,
            default: () => [],
        },
        disabledItems: {
            type: Array as PropType<number[]>,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            activeItems: [] as number[],
        }
    },
    created() {
        this.activeItems.push(...this.initialActiveItems)
    },
    methods: {
        toggle(index: number): void {
            if (this.disabledItems.includes(index)) {
                return
            }
            if (this.activeItems.includes(index)) {
                this.activeItems.splice(this.activeItems.indexOf(index), 1)
            } else if (this.multiple) {
                this.activeItems.push(index)
            } else {
                this.activeItems = [index]
            }
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            { class: 'r-accordion' },
            this.items.map((item, index) =>
                createElement(
                    'section',
                    {
                        key: index,
                        class: 'r-accordion__item',
                    },
                    [
                        createElement(
                            'button',
                            {
                                class: [
                                    'r-accordion__link',
                                    {
                                        'r-accordion__link--active':
                                            this.activeItems.includes(index),
                                    },
                                ],
                                attrs: {
                                    type: 'button',
                                },
                                on: { click: () => this.toggle(index) },
                            },
                            [
                                this.$scopedSlots.title?.({
                                    item,
                                    index,
                                }),
                            ]
                        ),
                        !this.disabledItems.includes(index)
                            ? createElement(CollapseTransition, [
                                  this.activeItems.includes(index)
                                      ? createElement(
                                            'section',
                                            {
                                                class: 'r-accordion__content-wrapper',
                                            },
                                            [
                                                createElement(
                                                    'div',
                                                    {
                                                        class: 'r-accordion__content',
                                                    },
                                                    [
                                                        this.$scopedSlots.content?.(
                                                            {
                                                                item,
                                                            }
                                                        ),
                                                    ]
                                                ),
                                            ]
                                        )
                                      : undefined,
                              ])
                            : undefined,
                    ]
                )
            )
        )
    },
})
