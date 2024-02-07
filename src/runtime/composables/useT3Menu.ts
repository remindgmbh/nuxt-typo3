import { type ComponentPublicInstance, type Ref, readonly } from 'vue'
import { useState } from '#imports'

export function useT3Menu(statePrefix = 't3-menu') {
    const active: Ref<string | undefined> = useState<string | undefined>(
        `${statePrefix}-active`,
        () => undefined,
    )

    const triggers: Ref<Array<HTMLElement | ComponentPublicInstance>> =
        useState<Array<HTMLElement | ComponentPublicInstance>>(
            `${statePrefix}-triggers`,
            () => [],
        )

    function close(): void {
        active.value = undefined
    }

    function toggle(id: string): void {
        active.value = active.value === id ? undefined : id
    }

    return {
        active: readonly(active),
        triggers,

        close,
        toggle,
    }
}
