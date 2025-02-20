import { type Ref, computed, ref } from 'vue'

export function useT3Tabs<T>(
    id: Ref<string>,
    items: Ref<T[]>,
    initialActiveIndex?: Ref<number>,
) {
    const activeItemIndex = ref(initialActiveIndex?.value)

    function toggle(index?: number): void {
        activeItemIndex.value = index
    }
    const activeItem = computed(() =>
        activeItemIndex.value !== undefined
            ? items.value.at(activeItemIndex.value)
            : undefined,
    )

    function getKey(index: number) {
        return `${id.value}-${index}`
    }

    function getButtonId(index: number) {
        return `${getKey(index)}-button`
    }

    function getContentId(index: number) {
        return `${getKey(index)}-content`
    }

    return {
        activeItem,
        activeItemIndex,

        getButtonId,
        getContentId,
        getKey,
        toggle,
    }
}
