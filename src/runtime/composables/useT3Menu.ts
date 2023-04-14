import { ComponentPublicInstance, Ref, readonly } from 'vue'
import { watch, useRoute, useState } from '#imports'

export function useT3Menu(statePrefix: string = 't3-menu') {
    const route = useRoute()

    const active: Ref<string | undefined> = useState<string | undefined>(
        `${statePrefix}-active`,
        () => undefined
    )

    const triggers: Ref<Array<HTMLElement | ComponentPublicInstance>> =
        useState<Array<HTMLElement | ComponentPublicInstance>>(
            `${statePrefix}-triggers`,
            () => []
        )

    function close(): void {
        active.value = undefined
    }

    function toggle(id: string): void {
        active.value = active.value === id ? undefined : id
    }

    watch(route, () => (active.value = undefined))

    return {
        active: readonly(active),
        triggers,
        close,
        toggle,
    }
}
