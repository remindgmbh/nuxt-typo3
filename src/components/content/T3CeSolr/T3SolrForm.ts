import Vue, { CreateElement, VNode, PropType } from 'vue'
import { SearchForm } from '../../../api'

export const SEARCH_TERM_INPUT_NAME = 'search_term'

export default Vue.extend({
    name: 'T3SolrForm',
    props: {
        form: {
            type: Object as PropType<SearchForm | null>,
            required: false,
            default: null,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false,
        },
        searchTerm: {
            type: String,
            required: false,
            default: '',
        },
        suggestionsTop: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        async getSuggestionList(value: string): Promise<string[]> {
            if (!this.form) {
                return Promise.resolve([])
            }

            const response = await this.$axios.get(this.form.suggest.url, {
                params: {
                    [this.form.suggest.queryParam]: value,
                },
            })

            return Object.keys(response.data.suggestions)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('div', { class: 't3-solr-form' }, [
            createElement(
                'FormulateForm',
                {
                    on: {
                        submit: (data: { [key: string]: any }) => {
                            this.$emit('submit', data)
                        },
                    },
                },
                [
                    createElement('FormulateInput', {
                        props: {
                            type: 'suggest',
                            name: SEARCH_TERM_INPUT_NAME,
                            value: this.searchTerm,
                        },
                        attrs: {
                            autocomplete: 'off',
                            disabled: this.isLoading || this.disabled,
                            placeholder: this.$t(
                                'rmnd-nuxt-typo3.search.term'
                            ).toString(),
                            list: this.getSuggestionList,
                            top: this.suggestionsTop,
                        },
                    }),
                    createElement('FormulateInput', {
                        props: {
                            type: 'submit',
                            label: this.$t(
                                `rmnd-nuxt-typo3.search.${
                                    this.isLoading ? 'loading' : 'button'
                                }`
                            ).toString(),
                        },
                        class: {
                            'is-loading': this.isLoading,
                        },
                        attrs: {
                            disabled: this.isLoading || this.disabled,
                        },
                    }),
                ]
            ),
        ])
    },
})
