import { CreateElement, VNode, PropType } from 'vue'
import BaseCe from '../../mixins/BaseCe'
import { ScrollIndicator } from '../../../../util/scroll-indicator'

export default BaseCe.extend({
    name: 'CeTable',
    props: {
        tableCaption: {
            type: String,
            required: false,
            default: '',
        },
        tableHeaderPosition: {
            type: Number,
            required: false,
            default: 0,
        },
        tableClass: {
            type: String,
            required: false,
            default: '',
        },
        tableTfoot: {
            type: Number,
            required: false,
            default: 0,
        },
        bodytext: {
            type: Array as PropType<string[][]>,
            required: true,
            default: () => [],
        },
    },
    computed: {
        thead(): string[] | false | undefined {
            return this.tableHeaderPosition === 1
                ? [...this.bodytext].shift()
                : false
        },
        tbody(): string[][] {
            const tbody = [...this.bodytext]
            if (this.thead) {
                tbody.shift()
            }
            if (this.tfoot) {
                tbody.pop()
            }
            return tbody
        },
        tfoot(): string[] | false | undefined {
            return this.tableTfoot === 1 ? [...this.bodytext].pop() : false
        },
    },
    data() {
        return {
            left: true,
            right: true,
        }
    },
    mounted(): void {
        const content = this.$refs.content as Element
        const viewport = this.$refs.viewport as Element

        new ScrollIndicator({
            viewport,
            content,
            direction: 'left',
        }).watch((detached) => {
            this.left = !detached
        })
        new ScrollIndicator({
            viewport,
            content,
            direction: 'right',
        }).watch((detached) => {
            this.right = !detached
        })
    },
    render(createElement: CreateElement): VNode {
        const renderCaption = () => {
            if (this.tableCaption) {
                return createElement('caption', [this.tableCaption])
            }
        }

        const renderHeader = () => {
            if (this.thead) {
                return createElement('thead', [
                    createElement('tr', [
                        this.thead.map((col) => createElement('th', [col])),
                    ]),
                ])
            }
        }

        const renderBody = () => {
            if (this.tbody) {
                return createElement('tbody', [
                    this.tbody.map((row) =>
                        createElement('tr', [
                            row.map((col, colKey) =>
                                createElement(
                                    this.tableHeaderPosition === 2 &&
                                        colKey === 0
                                        ? 'th'
                                        : 'td',
                                    [col]
                                )
                            ),
                        ])
                    ),
                ])
            }
        }

        return createElement('div', { class: 'ce-table' }, [
            createElement('ce-header', { props: this.$props }),
            createElement('div', { class: 'ce-table__container' }, [
                createElement('div', {
                    class: [
                        'ce-table__overlay-left',
                        { 'ce-table__overlay-left--visible': !this.left },
                    ],
                }),
                createElement('div', {
                    class: [
                        'ce-table__overlay-right',
                        { 'ce-table__overlay-right--visible': !this.right },
                    ],
                }),
                createElement(
                    'div',
                    { class: 'ce-table__viewport', ref: 'viewport' },
                    [
                        createElement('table', { ref: 'content' }, [
                            renderCaption(),
                            renderHeader(),
                            renderBody(),
                        ]),
                    ]
                ),
            ]),
        ])
    },
})
