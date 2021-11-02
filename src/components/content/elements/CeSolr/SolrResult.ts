import Vue, { CreateElement, PropType, VNode } from 'vue'
import { SearchResult, SearchDocument } from '../../../../api'

export default Vue.extend({
    name: 'SolrResult',
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
                    class: 'solr-result__content',
                    props: {
                        content: document.content,
                    },
                })
            }
        }

        const renderDocument = (document: SearchDocument) => {
            return createElement('div', { class: 'solr-result__item' }, [
                createElement('html-parser', {
                    class: 'solr-result__title',
                    props: { content: document.title },
                }),
                renderContent(document),
                createElement(
                    'r-typolink',
                    {
                        class: 'solr-result__link',
                        props: { to: document.url },
                    },
                    this.$t('rmnd-nuxt-typo3.search.link').toString()
                ),
            ])
        }

        return createElement(
            'r-responsive-height-container',
            { class: 'solr-result' },
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
                                class: 'solr-result__page',
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
