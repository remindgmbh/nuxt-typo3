import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../mixins/BaseCe'
import { SET_PAGE } from '../../../../pages/Default'
import { SearchForm, SearchResult } from '../../../../api'
import { SEARCH_TERM_INPUT_NAME } from './SolrForm'

export default BaseCe.extend({
    name: 'CeSolrPiResults',
    props: {
        data: {
            type: Object as PropType<{
                form: SearchForm
                result?: SearchResult
            }>,
            required: true,
        },
    },
    data() {
        return {
            searchTerm: '',
            isLoading: false,
        }
    },
    computed: {
        paginationPosition(): 'top' | 'bottom' | 'both' {
            return this.$nuxt.context.$rmndTypo3.content.solr_pi_results
                .paginationPosition
        },
        paginationPositionTop(): boolean {
            return ['top', 'both'].includes(this.paginationPosition)
        },
        paginationPositionBottom(): boolean {
            return ['bottom', 'both'].includes(this.paginationPosition)
        },
    },
    created() {
        this.searchTerm = this.data.result?.query || ''
    },
    methods: {
        submit(data: { [key: string]: any }): void {
            const term = data[SEARCH_TERM_INPUT_NAME] || '*'

            this.$router.push({
                path: this.$route.path,
                query: { [this.data.form.queryParams.q]: term },
            })
        },
    },
    watch: {
        async $route(): Promise<void> {
            try {
                this.isLoading = true

                const response = await this.$axios.get(this.$route.path, {
                    params: this.$route.query,
                })

                this.$nuxt.$emit(SET_PAGE, response.data)

                this.$emit('loaded')
            } finally {
                this.isLoading = false
            }
        },
    },
    render(createElement: CreateElement): VNode {
        const renderForm = () => {
            return createElement('solr-form', {
                props: {
                    isLoading: this.isLoading,
                    searchTerm: this.searchTerm,
                },
                on: {
                    submit: this.submit,
                },
            })
        }

        const renderResult = () => {
            if (this.data.result) {
                return [
                    this.paginationPositionTop
                        ? createElement('solr-pagination', {
                              props: {
                                  pagination: this.data.result.documents
                                      .pagination,
                                  form: this.data.form,
                              },
                          })
                        : undefined,
                    createElement('solr-result', {
                        props: {
                            result: this.data.result,
                        },
                    }),
                    this.paginationPositionBottom
                        ? createElement('solr-pagination', {
                              props: {
                                  pagination: this.data.result.documents
                                      .pagination,
                                  form: this.data.form,
                              },
                          })
                        : undefined,
                ]
            }
        }

        return createElement('div', { class: 'ce-solr' }, [
            createElement('ce-header', { props: this.$props }),
            renderForm(),
            renderResult(),
        ])
    },
})
