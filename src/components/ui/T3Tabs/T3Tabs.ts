import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
    name: 'T3Tabs',
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
        return createElement('section', { class: 't3-tabs' }, [
            createElement('div', { class: 't3-tabs__links' }, [
                this.items.map((item, index) =>
                    createElement(
                        'button',
                        {
                            key: index,
                            class: [
                                't3-tabs__link',
                                {
                                    't3-tabs__link--active':
                                        this.activeItem === index,
                                },
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
                't3-responsive-height-container',
                {
                    class: 't3-tabs__contents',
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
                                          class: 't3-tabs__content',
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
