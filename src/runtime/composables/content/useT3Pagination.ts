import * as T3Model from '../../models'
import { type Ref, computed } from 'vue'

export function useT3Pagination(
    pagination: Ref<T3Model.Typo3.Extbase.Pagination>,
    numberOfPages?: Ref<number | undefined>,
) {
    const currentPage = computed<T3Model.Typo3.Extbase.PaginationPage>(
        () => pagination.value.pages.find((page) => page.active)!,
    )

    const pages = computed<T3Model.Typo3.Extbase.PaginationPage[]>(() => {
        if (!numberOfPages?.value) {
            return pagination.value.pages
        }

        const result = new Set<T3Model.Typo3.Extbase.PaginationPage>()

        function setPage(pageNumber: number) {
            const page = pagination.value.pages.find(
                (page) => page.pageNumber === pageNumber,
            )
            if (page) {
                result.add(page)
            }
        }

        result.add(pagination.value.pages[0])
        result.add(pagination.value.pages[pagination.value.pages.length - 1])
        result.add(currentPage.value)

        for (let i = 1; result.size < numberOfPages.value; i++) {
            setPage(currentPage.value.pageNumber + i)

            if (result.size >= numberOfPages.value) {
                break
            }

            setPage(currentPage.value.pageNumber - i)
        }

        return Array.from(result.values())
            .filter((page) => page)
            .sort((a, b) => a.pageNumber - b.pageNumber)
    })

    function showDivider(index: number): boolean {
        return (
            index !== pages.value.length - 1 &&
            pages.value.at(index)!.pageNumber + 1 !==
                pages.value.at(index + 1)?.pageNumber
        )
    }

    return {
        pages,
        showDivider,
    }
}
