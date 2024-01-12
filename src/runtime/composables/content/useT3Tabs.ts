import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'

export function useT3Tabs(items: MaybeRefOrGetter<any[]>) {
    const activeItemIndex = ref(0)

    function toggle(index: number): void {
        activeItemIndex.value = index
    }
    const activeItem = computed(() => toValue(items).at(activeItemIndex.value))

    return {
        activeItem,
        activeItemIndex,

        toggle,
    }
}
