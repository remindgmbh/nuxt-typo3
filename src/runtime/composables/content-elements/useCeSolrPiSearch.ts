import { computed, ref } from 'vue'
import { useRouter } from '#app'
import { useI18n } from 'vue-i18n'
import { Api, Model } from '#nuxt-typo3'

const SEARCH_TERM_INPUT_NAME = 'search_term'

export function useCeSolrPiSearch(
    content: Api.Content.SolrSearch | Api.Content.SolrResults
) {
    const { t } = useI18n()

    const router = useRouter()

    const loading = ref(false)

    const formElements = computed<Model.FormElement[]>(() => {
        const formElement = new Model.FormElement({
            name: SEARCH_TERM_INPUT_NAME,
            type: 'text',
            defaultValue: (content as Api.Content.SolrResults).data.result
                ?.query,
            placeholder: t('solr.placeholder'),
        })

        return [formElement]
    })

    const submitLabel = computed(() =>
        loading ? t('solr.loading') : t('solr.submit')
    )

    async function search(data: { [key: string]: any }) {
        const term = data[SEARCH_TERM_INPUT_NAME] || '*'

        const path = content.data.form.targetUrl

        const query = {
            [content.data.form.queryParams.q]: term,
        }

        loading.value = true

        await router.push({
            path,
            query,
        })

        loading.value = false
    }

    return { formElements, loading, submitLabel, search }
}
