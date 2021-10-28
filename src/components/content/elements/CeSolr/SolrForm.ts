import Vue, { CreateElement, VNode } from 'vue'

export const SEARCH_TERM_INPUT_NAME = 'search_term'

export default Vue.extend({
    name: 'SolrForm',
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
        searchTerm: {
            type: String,
            required: false,
            default: '',
        },
    },
    methods: {
        submit(data: { [key: string]: any }) {
            this.$emit('submit', data)
        },
    },
    render(createElement: CreateElement): VNode {
        return createElement('div', { class: 'solr-form' }, [
            createElement(
                'FormulateForm',
                {
                    on: {
                        submit: this.submit,
                    },
                },
                [
                    createElement('FormulateInput', {
                        props: {
                            type: 'text',
                            name: SEARCH_TERM_INPUT_NAME,
                            value: this.searchTerm,
                        },
                        attrs: {
                            disabled: this.isLoading,
                            placeholder: this.$t(
                                'rmnd-nuxt-typo3.search.term'
                            ).toString(),
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
                            disabled: this.isLoading,
                        },
                    }),
                ]
            ),
        ])
    },
})
