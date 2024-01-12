import { type MaybeRefOrGetter, ref, toValue } from 'vue'

export function useT3Accordion(
    initialActiveItems: MaybeRefOrGetter<any[]>,
    disabledItems: MaybeRefOrGetter<any[]>,
    multiple: MaybeRefOrGetter<boolean>,
) {
    const activeItems = ref<number[]>([])

    activeItems.value.push(...toValue(initialActiveItems))

    function toggle(index: number): void {
        if (toValue(disabledItems).includes(index)) {
            return
        }
        if (activeItems.value.includes(index)) {
            activeItems.value.splice(activeItems.value.indexOf(index), 1)
        } else if (toValue(multiple)) {
            activeItems.value.push(index)
        } else {
            activeItems.value = [index]
        }
    }

    return {
        activeItems,
        toggle,
    }
}
