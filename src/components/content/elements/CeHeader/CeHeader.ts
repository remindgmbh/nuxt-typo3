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

    private renderHeader(createElement: CreateElement): VNode {
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

    private renderSubHeader(createElement: CreateElement): VNode {
        return createElement('div', { class: 'ce-header__sub' }, this.subheader)
    }

    render(createElement: CreateElement): VNode {
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
                    ? [
                          this.renderSubHeader(createElement),
                          this.renderHeader(createElement),
                      ]
                    : [
                          this.renderHeader(createElement),
                          this.renderSubHeader(createElement),
                      ]
            )
        } else {
            return createElement()
        }
    }
}
