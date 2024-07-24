import { type Ref, computed } from 'vue'
import { type T3Model } from '#imports'

export function useT3Pagination(
    pagination: Ref<T3Model.Typo3.Extbase.Pagination>,
    numberOfPages?: Ref<number | undefined>,
) {
    const currentPage = computed(() =>
        pagination.value.pages.find((page) => page.active),
    )

    const pages = computed<T3Model.Typo3.Extbase.PaginationPage[]>(() => {
        if (!numberOfPages?.value) {
            return pagination.value.pages
        }

        const result = new Set<T3Model.Typo3.Extbase.PaginationPage>()

        function setPage(pageNumber?: number) {
            const page = pagination.value.pages.find(
                (page) => page.pageNumber === pageNumber,
            )
            if (page) {
                result.add(page)
                return true
            }
            return false
        }

        // add first page
        result.add(pagination.value.pages[0])

        // add last page
        result.add(pagination.value.pages[pagination.value.pages.length - 1])

        if (currentPage.value) {
            // add current page
            result.add(currentPage.value)

            // add pages around current page until limit is reached
            for (let i = 1; result.size < numberOfPages.value; i++) {
                const next = setPage(currentPage.value.pageNumber + i)

                if (result.size >= numberOfPages.value) {
                    break
                }

                const prev = setPage(currentPage.value.pageNumber - i)

                // no pages are available anymore
                if (!next && !prev) {
                    break
                }
            }
        }

        return Array.from(result.values())
            .filter((page) => page)
            .sort((a, b) => a.pageNumber - b.pageNumber)
    })

    function showDivider(index: number): boolean {
        const page = pages.value.at(index)
        return (
            index !== pages.value.length - 1 &&
            !!page &&
            page.pageNumber + 1 !== pages.value.at(index + 1)?.pageNumber
        )
    }

    return {
        pages,
        showDivider,
    }
}
