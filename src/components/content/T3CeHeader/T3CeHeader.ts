import { CreateElement, VNode } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import './T3CeHeader.scss'

export default BaseCe.extend({
    name: 'T3CeHeader',
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
                    class: 't3-ce-header__main',
                },
                this.headerLink
                    ? [
                          createElement(
                              't3-typolink',
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
                { class: 't3-ce-header__sub' },
                this.subheader
            )
        }

        if (this.visible) {
            return createElement(
                'header',
                {
                    class: [
                        't3-ce-header',
                        {
                            [`text-${this.headerPosition}`]:
                                this.headerPosition,
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
