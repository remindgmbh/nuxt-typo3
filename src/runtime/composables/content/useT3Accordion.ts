import { type MaybeRefOrGetter, ref, toValue } from 'vue'
import type { T3Model } from '#imports'

export function useT3Accordion(
    id: MaybeRefOrGetter<string>,
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

    function getButtonId(item: T3Model.Typo3.Content.Item) {
        return `${id}-button-${item.id}`
    }

    function getContentId(item: T3Model.Typo3.Content.Item) {
        return `${id}-content-${item.id}`
    }

    return {
        activeItems,
        getButtonId,
        getContentId,
        toggle,
    }
}
