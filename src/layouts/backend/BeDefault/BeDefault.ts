import { mapState } from 'vuex'
import { CreateElement, VNode } from 'vue'
import BaseBe from '../../mixins/BaseBe'
import { Breadcrumb } from '../../../api'
import { Options } from '../../../options'

export default BaseBe.extend({
    name: 'BeDefault',
    computed: {
        ...mapState({
            breadcrumbs: (state: any): Breadcrumb[] =>
                state.typo3.page.page ? state.typo3.page.page.breadcrumbs : [], // get breadcrumbs for current page,
        }),
        options(): Options {
            return this.$nuxt.context.$rmndTypo3
        },
        container(): boolean {
            return this.options.layout.container
        },
        showBreadcrumbs(): boolean {
            return this.breadcrumbs.length > 1
        },
    },
    render(createElement: CreateElement): VNode {
        const renderContent = (type: string, colPos: number) => {
            return createElement('div', { class: `be-default__${type}` }, [
                createElement('ce-renderer', {
                    props: {
                        content: this.content[`colPos${colPos}`],
                        options: this.options,
                    },
                }),
            ])
        }

        return createElement(
            'div',
            {
                class: ['be-default', { container: this.container }],
            },
            [
                renderContent('before-breadcrumbs', 1),
                this.showBreadcrumbs
                    ? createElement(
                          'div',
                          { class: 'be-default__breadcrumbs' },
                          [
                              createElement('ce-frame', [
                                  createElement('ce-wrapper', [
                                      createElement('ce-breadcrumbs', {
                                          props: { items: this.breadcrumbs },
                                      }),
                                  ]),
                              ]),
                          ]
                      )
                    : undefined,
                renderContent('main', 0),
                renderContent('footer', 2),
            ]
        )
    },
})
