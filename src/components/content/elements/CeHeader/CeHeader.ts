import { Component, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { CreateElement, VNode } from 'vue'
import { Typolink } from '../../../../api/typolink'

@Component({
    name: 'CeHeader',
})
export default class CeHeader extends mixins(baseCe) implements baseCe {
    headerLayout!: number
    headerPosition!: string
    headerLink!: Typolink | string
    header!: string
    subheader!: string

    get visible(): boolean {
        return this.headerLayout !== 100 && (!!this.header || !!this.subheader)
    }

    get subHeaderTop(): boolean {
        return (
            this.$nuxt.context.$rmndTypo3.content.header.subHeaderPosition ===
            'top'
        )
    }

    get tag(): string {
        return this.headerLayout > 0 && this.headerLayout <= 6
            ? `h${this.headerLayout}`
            : 'div'
    }

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
                              'typolink',
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
    }
}
