import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

export function useCeTable(content: Api.Content.Table) {
    const headerTop = computed(() =>
        [1, 3].includes(content.tableHeaderPosition)
    )
    const headerLeft = computed(() =>
        [2, 3].includes(content.tableHeaderPosition)
    )

    const thead = computed(() =>
        headerTop ? [...content.bodytext].shift() : undefined
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
