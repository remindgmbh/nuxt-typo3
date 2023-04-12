import { computed } from 'vue'
import * as T3Api from '../../api'

export function useT3CeTable(content: T3Api.Content.Table) {
    const headerTop = computed<boolean>(() =>
        [1, 3].includes(content.tableHeaderPosition)
    )
    const headerLeft = computed<boolean>(() =>
        [2, 3].includes(content.tableHeaderPosition)
    )

    const thead = computed<string[] | undefined>(() =>
        headerTop.value ? [...content.bodytext].shift() : undefined
    )

    const tbody = computed<string[][]>(() => {
        const tbody = [...content.bodytext]
        if (thead.value) {
            tbody.shift()
        }
        if (tfoot.value) {
            tbody.pop()
        }
        return tbody
    })

    const tfoot = computed<string[] | undefined>(() =>
        content.tableTfoot === 1 ? [...content.bodytext].pop() : undefined
    )

    return {
        headerLeft,
        headerTop,
        thead,
        tbody,
        tfoot,
    }
}
