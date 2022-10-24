import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'

export function useT3CeTable(content: T3Api.Content.Table) {
    const headerTop = computed(() =>
        [1, 3].includes(content.tableHeaderPosition)
    )
    const headerLeft = computed(() =>
        [2, 3].includes(content.tableHeaderPosition)
    )

    const thead = computed(() =>
        headerTop.value ? [...content.bodytext].shift() : undefined
    )

    const tbody = computed(() => {
        const tbody = [...content.bodytext]
        if (thead.value) {
            tbody.shift()
        }
        if (tfoot.value) {
            tbody.pop()
        }
        return tbody
    })

    const tfoot = computed(() =>
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
