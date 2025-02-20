import { type Ref, ref } from 'vue'

export function useT3Accordion(
    id: Ref<string>,
    initialActiveItems: Ref<number[]>,
    disabledItems: Ref<number[]>,
    multiple: Ref<boolean>,
) {
    const activeItems = ref<string[]>([])

    activeItems.value.push(
        ...initialActiveItems.value.map((index) => getKey(index)),
    )

    function toggle(index: number): void {
        const key = getKey(index)
        if (disabledItems.value.includes(index)) {
            return
        }
        if (activeItems.value.includes(key)) {
            activeItems.value.splice(activeItems.value.indexOf(key), 1)
        } else if (multiple.value) {
            activeItems.value.push(key)
        } else {
            activeItems.value = [key]
        }
    }

    function getKey(index: number) {
        return `${id.value}-${index}`
    }

    function getButtonId(index: number) {
        return `${getKey(index)}-button`
    }

    function getContentId(index: number) {
        return `${getKey(index)}-content`
    }

    function isActive(index: number) {
        return activeItems.value.includes(getKey(index))
    }

    return {
        activeItems,
        getButtonId,
        getContentId,
        getKey,
        isActive,
        toggle,
    }
}
