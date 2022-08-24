import { computed, Ref } from 'vue'
import { Api, Model, useConfig } from '#nuxt-typo3'

export function useNewsList(content: Ref<Api.Content.NewsPiList>) {
    const config = useConfig()

    const pagination = computed<Model.Pagination | undefined>(() => {
        const pagination = content.value.data.pagination

        if (!pagination) {
            return undefined
        }

        return {
            first: pagination.first,
            last: pagination.last,
            prev: pagination.prev,
            next: pagination.next,
            pages: pagination.pages.map((page) => {
                return {
                    current: !!page.current,
                    link: page.link,
                    pageNumber: page.page,
                }
            }),
        }
    })

    const listElements = computed(() => content.value.data.list ?? [])

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.news.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.news.pagination.position)
    )

    return { listElements, pagination, paginationBottom, paginationTop }
}
