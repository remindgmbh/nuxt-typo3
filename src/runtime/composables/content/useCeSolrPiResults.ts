import { computed, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Api, Model, useConfig } from '#nuxt-typo3'

export function useCeSolrPiResults(content: Ref<Api.Content.SolrResults>) {
    const { t } = useI18n()
    const config = useConfig()

    const noResultsFound = computed(() => t('solr.noResults'))

    const pagination = computed<Model.Pagination | undefined>(
        () => content.value.data.results.pagination
    )

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.solr.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.solr.pagination.position)
    )

    return { noResultsFound, pagination, paginationBottom, paginationTop }
}
