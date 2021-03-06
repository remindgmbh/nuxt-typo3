import { CreateElement, PropType, VNode } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import { SET_PAGE } from '../../../pages/Default'
import { SearchForm, SearchResult } from '../../../api'
import { SEARCH_TERM_INPUT_NAME } from './T3SolrForm'

export default BaseCe.extend({
    name: 'T3CeSolrPiResults',
    props: {
        data: {
            type: [Object, String] as PropType<
                | string
                | {
                      form: SearchForm
                      result?: SearchResult
                  }
            >,
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
        if (typeof this.data !== 'string') {
            this.searchTerm = this.data.result?.query || ''
        }
    },
    methods: {
        submit(data: { [key: string]: any }): void {
            if (typeof this.data === 'string') {
                return
            }

            const term = data[SEARCH_TERM_INPUT_NAME] || '*'

            const query = { [this.data.form.queryParams.q]: term }

            if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
                this.isLoading = true

                this.$router.push({
                    path: this.$route.path,
                    query,
                })
            }
        },
    },
    watch: {
        $route(): void {
            this.$nuxt.$emit(SET_PAGE, this.$store.state.typo3.page)
            this.$emit('loaded')
            this.isLoading = false
        },
    },
    render(createElement: CreateElement): VNode {
        const renderForm = () => {
            if (typeof this.data !== 'string') {
                return createElement('t3-solr-form', {
                    props: {
                        isLoading: this.isLoading,
                        searchTerm: this.searchTerm,
                        form: this.data.form,
                    },
                    on: {
                        'update:searchTerm': (value: string) =>
                            (this.searchTerm = value),
                        submit: this.submit,
                    },
                })
            }
        }

        const renderResult = () => {
            if (typeof this.data !== 'string' && this.data.result) {
                return [
                    this.paginationPositionTop
                        ? createElement('t3-solr-pagination', {
                              props: {
                                  pagination:
                                      this.data.result.documents.pagination,
                                  form: this.data.form,
                              },
                          })
                        : undefined,
                    createElement('t3-solr-result', {
                        props: {
                            result: this.data.result,
                        },
                    }),
                    this.paginationPositionBottom
                        ? createElement('t3-solr-pagination', {
                              props: {
                                  pagination:
                                      this.data.result.documents.pagination,
                                  form: this.data.form,
                              },
                          })
                        : undefined,
                ]
            }
        }

        const renderMessage = () => {
            if (typeof this.data === 'string') {
                return createElement('html-parser', {
                    class: 't3-ce-solr__message',
                    props: { content: this.data },
                })
            }
        }

        return createElement('div', { class: 't3-ce-solr' }, [
            createElement('ce-header', { props: this.$props }),
            renderForm(),
            renderMessage(),
            renderResult(),
        ])
    },
})
