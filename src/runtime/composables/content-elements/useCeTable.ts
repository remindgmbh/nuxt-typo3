import { computed, ref, onMounted, Ref } from 'vue'
import { Api, useUtil } from '#nuxt-typo3'

export function useCeTable(
    content: Api.Content.Table,
    table?: Ref<HTMLElement | undefined>,
    viewport?: Ref<HTMLElement | undefined>
) {
    const { detectScrollEnd } = useUtil()

    const headerTop = computed(() =>
        [1, 3].includes(content.tableHeaderPosition)
    )
    const headerLeft = computed(() =>
        [2, 3].includes(content.tableHeaderPosition)
    )

    const thead = computed(() =>
        headerTop ? [...content.bodytext].shift() : false
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
        content.tableTfoot === 1 ? [...content.bodytext].pop() : false
    )

    const left = ref(true)
    const right = ref(true)

    onMounted(() => {
        if (table?.value && viewport?.value) {
            detectScrollEnd(
                table.value,
                'left',
                (detached) => (left.value = !detached),
                viewport.value
            )

            detectScrollEnd(
                table.value,
                'right',
                (detached) => (right.value = !detached),
                viewport.value
            )
        }
    })

    return {
        headerLeft,
        headerTop,
        left,
        right,
        thead,
        tbody,
        tfoot,
    }
}
