import Vue, { VueConstructor, VNode, CreateElement } from 'vue'
import defaultPage from 'nuxt-typo3/lib/templates/mixins/page/default'
import { SET_PAGE as MUTATION_SET_PAGE } from 'nuxt-typo3/lib/templates/store/mutation-types'
import type { TYPO3 } from 'nuxt-typo3'

export const SET_PAGE = 'SET_PAGE'
export const SET_CONTENT = 'SET_CONTENT'

interface DefaultPageAsyncData extends Vue {
    page: TYPO3.Response.Page
    backendLayout: string
}

export default (Vue as VueConstructor<Vue & DefaultPageAsyncData>).extend({
    mixins: [defaultPage],
    created(): void {
        this.$nuxt.$on(SET_PAGE, (page: TYPO3.Response.Page) => {
            const slug = (page.page as any).navigation.slug

            if (this.$route.path !== slug) {
                this.$nuxt.$router.push({ path: slug })
            } else {
                this.setPage(page)
            }
        })
        this.$nuxt.$on(SET_CONTENT, ({ content, index }) => {
            const page = JSON.parse(JSON.stringify(this.page))
            page.content[`colPos${content.colPos}`][index] = content
            this.setPage(page)
        })
    },
    beforeDestroy(): void {
        this.$nuxt.$off(SET_PAGE)
        this.$nuxt.$off(SET_CONTENT)
    },
    methods: {
        setPage(page: TYPO3.Response.Page): void {
            this.page = page
            this.$store.commit(MUTATION_SET_PAGE, page)
        },
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
