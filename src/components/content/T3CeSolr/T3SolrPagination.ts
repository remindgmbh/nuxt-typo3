import Vue, { CreateElement, PropType, VNode } from 'vue'
import { Route } from 'vue-router'
import defu from 'defu'
import { SearchForm, SearchPagination } from '../../../api'

export interface Page {
    value: number
    route: Route
    isActive: boolean
}

export default Vue.extend({
    name: 'T3SolrPagination',
    props: {
        form: {
            type: Object as PropType<SearchForm>,
            required: true,
        },
        pagination: {
            type: Object as PropType<SearchPagination>,
            required: true,
        },
    },
    computed: {
        pages(): Page[] {
            return Array.from(
                { length: this.pagination.numberOfPages },
                (_value, index) => index + 1
            ).map((value) => {
                return {
                    value,
                    route: this.getPageRoute(value),
                    isActive: this.pagination.current === value,
                }
            })
        },
    },
    methods: {
        getPageRoute(pageNumber: number): Route {
            return defu(
                {
                    query: {
                        [this.form.queryParams.page]: pageNumber,
                    },
                },
                this.$route
            ) as Route
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement(
            'div',
            { class: 't3-solr-pagination' },
            this.pages.map((page) => {
                return createElement(
                    page.isActive ? 'span' : 'nuxt-link',
                    {
                        class: [
                            't3-solr-pagination__page',
                            {
                                't3-solr-pagination__page--active':
                                    page.isActive,
                            },
                        ],
                        props: {
                            to: page.route,
                        },
                    },
                    page.value.toString()
                )
            })
        )
    },
})
