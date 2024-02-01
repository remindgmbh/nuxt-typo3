import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'

export function useT3Tabs<T>(
    items: MaybeRefOrGetter<T[]>,
    initialActiveIndex?: number,
) {
    const activeItemIndex = ref(initialActiveIndex)

    function toggle(index?: number): void {
        activeItemIndex.value = index
    }
    const activeItem = computed(() =>
        activeItemIndex.value !== undefined
            ? toValue(items).at(activeItemIndex.value)
            : undefined,
    )

    return {
        activeItem,
        activeItemIndex,

        toggle,
    }
}
