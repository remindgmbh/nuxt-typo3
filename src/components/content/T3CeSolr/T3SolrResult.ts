import Vue, { CreateElement, PropType, VNode } from 'vue'
import { SearchResult, SearchDocument } from '../../../api'

export default Vue.extend({
    name: 'T3SolrResult',
    props: {
        result: {
            type: Object as PropType<SearchResult>,
            required: true,
        },
    },
    render(createElement: CreateElement): VNode {
        const renderContent = (document: SearchDocument) => {
            if (document.content) {
                return createElement('html-parser', {
                    class: 't3-solr-result__content',
                    props: {
                        content: document.content,
                    },
                })
            } else {
                return createElement('br')
            }
        }

        const renderDocument = (document: SearchDocument) => {
            return createElement('div', { class: 't3-solr-result__item' }, [
                createElement(
                    't3-typolink',
                    {
                        class: 't3-solr-result__title',
                        props: { to: document.url },
                    },
                    document.title
                ),
                renderContent(document),
                createElement(
                    't3-typolink',
                    {
                        class: 't3-solr-result__link',
                        props: { to: document.url },
                    },
                    document.url.url
                ),
            ])
        }

        return createElement(
            't3-responsive-height-container',
            { class: 't3-solr-result' },
            [
                createElement(
                    'transition',
                    {
                        props: { name: 'search-page-change', mode: 'out-in' },
                    },
                    [
                        createElement(
                            'div',
                            {
                                class: 't3-solr-result__page',
                                key: this.result.documents.pagination.current,
                            },
                            this.result.documents.list.map(renderDocument)
                        ),
                    ]
                ),
            ]
        )
    },
})
