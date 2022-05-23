import { computed, ref, onMounted, Ref } from 'vue'
import { ContentTable } from '#nuxt-typo3/api'
import { useScrollIndicator } from '#nuxt-typo3/composables/useScrollIndicator'

export const useCeTable = (
    props: Readonly<{
        id: number
        content: ContentTable
    }>,
    table?: Ref<HTMLElement | undefined>,
    viewport?: Ref<HTMLElement | undefined>
) => {
    const headerTop = computed(() =>
        [1, 3].includes(props.content.tableHeaderPosition)
    )
    const headerLeft = computed(() =>
        [2, 3].includes(props.content.tableHeaderPosition)
    )

    const thead = computed(() =>
        headerTop ? [...props.content.bodytext].shift() : false
    )

    const tbody = computed(() => {
        const tbody = [...props.content.bodytext]
        if (thead.value) {
            tbody.shift()
        }
        if (tfoot.value) {
            tbody.pop()
        }
        return tbody
    })

    const tfoot = computed(() =>
        props.content.tableTfoot === 1
            ? [...props.content.bodytext].pop()
            : false
    )

    const left = ref(true)
    const right = ref(true)

    onMounted(() => {
        if (table?.value && viewport?.value) {
            const { watch: watchLeft } = useScrollIndicator(
                table.value,
                'left',
                viewport.value
            )
            const { watch: watchRight } = useScrollIndicator(
                table.value,
                'right',
                viewport.value
            )

            watchLeft((detached) => (left.value = !detached))
            watchRight((detached) => (right.value = !detached))
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
