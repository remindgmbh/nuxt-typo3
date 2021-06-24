import { Component, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { CreateElement, VNode } from 'vue'

@Component({
    name: 'CeHeader',
})
export default class CeHeader extends mixins(baseCe) implements baseCe {
    headerLayout!: number
    headerPosition!: string
    headerLink!: any
    header!: string
    subheader!: string

    get visible(): boolean {
        return this.headerLayout !== 100
    }

    get headerAlignment(): string {
        return this.headerPosition
            ? `ce-header__main--${this.headerPosition}`
            : ''
    }

    get subHeaderTop(): boolean {
        return (
            this.$nuxt.context.$rmndTypo3.content.header.subHeaderPosition ===
            'top'
        )
    }

    render(createElement: CreateElement): VNode {
        if (this.visible) {
            const main = createElement(
                this.headerLink ? 'nuxt-link' : 'div',
                {
                    class: ['ce-header__main', this.headerAlignment],
                    attrs: this.headerLink
                        ? {
                              to: this.headerLink.url,
                          }
                        : {},
                },
                this.header
            )
            const sub = createElement(
                'div',
                { class: 'ce-header__sub' },
                this.subheader
            )

            return createElement(
                'div',
                { class: 'ce-header' },
                this.subHeaderTop ? [sub, main] : [main, sub]
            )
        } else {
            return createElement()
        }
    }
}
