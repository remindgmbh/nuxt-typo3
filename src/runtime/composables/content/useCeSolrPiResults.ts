import { computed, Ref } from 'vue'
import { useRoute, useRouter } from '#app'
import { useI18n } from 'vue-i18n'
import { Api, Model, useConfig } from '#nuxt-typo3'

export function useCeSolrPiResults(content: Ref<Api.Content.SolrResults>) {
    const { t } = useI18n()
    const config = useConfig()
    const route = useRoute()
    const router = useRouter()

    const noResultsFound = computed(() => t('solr.noResults'))

    const pagination = computed<Model.Pagination>(() => {
        const form = content.value.data.form
        const pagination = content.value.data.result.documents.pagination
        const first = router.resolve({
            path: form.targetUrl,
        })

        const last = router.resolve({
            path: form.targetUrl,
            query: {
                ...route.query,
                [form.queryParams.page]: pagination.numberOfPages,
            },
        })

        const prev =
            pagination.current > 1
                ? router.resolve({
                      path: form.targetUrl,
                      query: {
                          ...route.query,
                          [form.queryParams.page]: pagination.current - 1,
                      },
                  })
                : undefined

        const next =
            pagination.current < pagination.numberOfPages
                ? router.resolve({
                      path: form.targetUrl,
                      query: {
                          ...route.query,
                          [form.queryParams.page]: pagination.current + 1,
                      },
                  })
                : undefined

        return {
            first: first.fullPath,
            last: last.fullPath,
            prev: prev?.fullPath,
            next: next?.fullPath,
            pages: Array.from(Array(pagination.numberOfPages)).map(
                (_value, index) => {
                    const pageNumber = index + 1
                    const link = router.resolve({
                        path: form.targetUrl,
                        query: {
                            ...route.query,
                            [form.queryParams.page]: pageNumber,
                        },
                    })

                    return {
                        pageNumber,
                        current: pagination.current === pageNumber,
                        link: link.fullPath,
                    }
                }
            ),
        }
    })

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.solr.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.solr.pagination.position)
    )

    return { noResultsFound, pagination, paginationBottom, paginationTop }
}
