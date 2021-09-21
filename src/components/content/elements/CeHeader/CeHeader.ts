import { CreateElement, VNode } from 'vue'

import { BaseCe, RTypolink } from '../../..'

export default BaseCe.extend({
    name: 'CeHeader',
    computed: {
        visible(): boolean {
            return (
                this.headerLayout !== 100 && (!!this.header || !!this.subheader)
            )
        },
        subHeaderTop(): boolean {
            return (
                this.$nuxt.context.$rmndTypo3.content.header
                    .subHeaderPosition === 'top'
            )
        },
        tag(): string {
            return this.headerLayout > 0 && this.headerLayout <= 6
                ? `h${this.headerLayout}`
                : 'div'
        },
    },
    render(createElement: CreateElement): VNode {
        const renderHeader = () => {
            return createElement(
                this.tag,
                {
                    class: 'ce-header__main',
                },
                this.headerLink
                    ? [
                          createElement(
                              RTypolink,
                              { props: { to: this.headerLink } },
                              [this.header]
                          ),
                      ]
                    : this.header
            )
        }

        const renderSubheader = () => {
            return createElement(
                'div',
                { class: 'ce-header__sub' },
                this.subheader
            )
        }

        if (this.visible) {
            return createElement(
                'header',
                {
                    class: [
                        'ce-header',
                        {
                            [`text-${this.headerPosition}`]: this
                                .headerPosition,
                        },
                    ],
                },
                this.subHeaderTop
                    ? [renderSubheader.call(this), renderHeader.call(this)]
                    : [renderHeader.call(this), renderSubheader.call(this)]
            )
        } else {
            return createElement()
        }
    },
})
