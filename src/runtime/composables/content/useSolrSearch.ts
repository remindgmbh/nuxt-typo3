import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { debounce } from 'perfect-debounce'
import { Api, Model, useApi } from '#nuxt-typo3'

export function useSolrSearch(
    content: Api.Content.SolrSearch | Api.Content.SolrResults
) {
    const inputName = 'search_term'
    const api = useApi()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<Model.AutocompleteOptionGroup[]>([])
    const loading = ref(false)

    const defaultValue = computed(
        () => (content as Api.Content.SolrResults).data.result?.query
    )

    const placeholder = computed(() => t('solr.placeholder'))

    const submitLabel = computed(() =>
        loading.value ? t('solr.loading') : t('solr.submit')
    )

    async function onInput(value: string) {
        if (!value) {
            optionGroups.value = []
            return
        }

        const path = content.data.form.suggest.url
        const params = {
            [content.data.form.suggest.queryParam]: value,
        }

        const suggestions = await api.get<Api.Content.Solr.Suggestions>(path, {
            params,
        })

        optionGroups.value = [
            {
                name: 'default',
                options: Object.keys(suggestions.suggestions ?? []).map(
                    (key) => ({
                        key,
                        label: key,
                    })
                ),
            },
            {
                name: 'links',
                label: t('solr.directLinks'),
                options: (suggestions.documents ?? []).map((document) => ({
                    key: document.link,
                    label: document.title,
                    link: document.link,
                })),
            },
        ]
    }

    async function search(data: { [key: string]: any }) {
        const term = data[inputName] || '*'

        const path = content.data.form.targetUrl

        const query = {
            [content.data.form.queryParams.q]: term,
        }

        loading.value = true

        await navigateTo({ path, query })

        loading.value = false
    }

    const submit = handleSubmit(search)

    return {
        defaultValue,
        inputName,
        loading,
        optionGroups,
        placeholder,
        submitLabel,
        onInput: debounce(onInput, 300),
        submit,
    }
}
