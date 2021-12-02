import Vue, { CreateElement, VNode } from 'vue'
import { RResponsiveHeightContainer } from '..'

export default Vue.extend({
    name: 'RTabs',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeItem: 0,
        }
    },
    methods: {
        toggle(index: number): void {
            this.activeItem = index
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('section', { class: 'r-tabs' }, [
            createElement('div', { class: 'r-tabs__links' }, [
                this.items.map((item, index) =>
                    createElement(
                        'button',
                        {
                            key: index,
                            class: [
                                'r-tabs__link',
                                { 'is-active': this.activeItem === index },
                            ],
                            on: {
                                click: () => this.toggle(index),
                            },
                        },
                        this.$scopedSlots.title?.({ item })
                    )
                ),
            ]),
            createElement(
                RResponsiveHeightContainer,
                {
                    class: 'r-tabs__contents',
                },
                [
                    createElement(
                        'transition',
                        {
                            props: { name: 'tab-change', mode: 'out-in' },
                        },
                        this.items.map((item, index) =>
                            index === this.activeItem
                                ? createElement(
                                      'section',
                                      {
                                          key: index,
                                          class: 'r-tabs__content',
                                      },
                                      this.$scopedSlots.content?.({ item })
                                  )
                                : undefined
                        )
                    ),
                ]
            ),
        ])
    },
})
