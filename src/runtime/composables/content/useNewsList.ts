import { computed, Ref } from 'vue'
import { Api, Model, useConfig } from '#nuxt-typo3'

export function useNewsList(content: Ref<Api.Content.NewsPiList>) {
    const config = useConfig()

    const pagination = computed<Model.Pagination | undefined>(
        () => content.value.data.pagination
    )

    const listElements = computed(() => content.value.data.list ?? [])

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.news.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.news.pagination.position)
    )

    return { listElements, pagination, paginationBottom, paginationTop }
}
