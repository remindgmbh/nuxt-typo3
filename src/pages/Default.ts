import Vue, { VueConstructor, VNode, CreateElement } from 'vue'
import defaultPage from 'nuxt-typo3/lib/templates/mixins/page/default'
import type { TYPO3 } from 'nuxt-typo3'

export const SET_PAGE = 'SET_PAGE'
export const SET_CONTENT = 'SET_CONTENT'

interface DefaultPageAsyncData extends Vue {
    page: TYPO3.Response.Page
    backendLayout: string
}

export default (Vue as VueConstructor<Vue & DefaultPageAsyncData>).extend({
    mixins: [defaultPage],
    created() {
        this.$nuxt.$on(SET_PAGE, (page: TYPO3.Response.Page) => {
            this.page = page
        })
        this.$nuxt.$on(SET_CONTENT, ({ content, index }) => {
            const page = JSON.parse(JSON.stringify(this.page))
            page.content[`colPos${content.colPos}`][index] = content
            this.page = page
        })
    },
    render(createElement: CreateElement): VNode {
        return createElement('div', { class: 'page' }, [
            createElement('be-dynamic', {
                props: {
                    page: this.page.page,
                    content: this.page.content,
                    type: this.backendLayout,
                },
            }),
        ])
    },
})
