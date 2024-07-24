import { type Ref, computed } from 'vue'
import { type T3Model } from '#imports'

export function useT3CeTable(
    contentElement: Ref<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Table>
    >,
) {
    const headerTop = computed<boolean>(() =>
        [1, 3].includes(contentElement.value.content.tableHeaderPosition),
    )
    const headerLeft = computed<boolean>(() =>
        [2, 3].includes(contentElement.value.content.tableHeaderPosition),
    )

    const thead = computed<string[] | undefined>(() =>
        headerTop.value
            ? [...contentElement.value.content.bodytext].shift()
            : undefined,
    )

    const tbody = computed<string[][]>(() => {
        const tbody = [...contentElement.value.content.bodytext]
        if (thead.value) {
            tbody.shift()
        }
        if (tfoot.value) {
            tbody.pop()
        }
        return tbody
    })

    const tfoot = computed<string[] | undefined>(() =>
        contentElement.value.content.tableTfoot === 1
            ? [...contentElement.value.content.bodytext].pop()
            : undefined,
    )

    return {
        headerLeft,
        headerTop,
        tbody,
        tfoot,
        thead,
    }
}
