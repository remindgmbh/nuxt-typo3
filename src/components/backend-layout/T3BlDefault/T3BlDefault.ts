import { mapState } from 'vuex'
import { CreateElement, VNode } from 'vue'
import BaseBl from '../../../mixins/components/BaseBl'
import { Breadcrumb } from '../../../api'
import { Options } from '../../../options'
import './T3BlDefault.scss'

export default BaseBl.extend({
    name: 'T3BlDefault',
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
            return createElement('div', { class: `t3-bl-default__${type}` }, [
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
                class: ['t3-bl-default', { container: this.container }],
            },
            [
                renderContent('before-breadcrumbs', 1),
                this.showBreadcrumbs
                    ? createElement(
                          'div',
                          { class: 't3-bl-default__breadcrumbs' },
                          [
                              createElement('t3-frame', [
                                  createElement('t3-wrapper', [
                                      createElement('t3-breadcrumbs', {
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
