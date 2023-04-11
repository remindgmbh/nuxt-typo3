import { ComponentPublicInstance, readonly, watch } from 'vue'
import { useRoute, useState } from '#app'

export default function useT3Menu(statePrefix: string = 't3-menu') {
    const route = useRoute()

    const active = useState<string | undefined>(
        `${statePrefix}-active`,
        () => undefined
    )

    const triggers = useState<Array<HTMLElement | ComponentPublicInstance>>(
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
