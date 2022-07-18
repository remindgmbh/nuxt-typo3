import { ComponentPublicInstance, InjectionKey, Ref } from 'vue'

export const registerContentSymbol = Symbol(
    't3-topbar-layout:registerContent'
) as InjectionKey<(instance: ComponentPublicInstance) => void>

export const registerHeaderSymbol = Symbol(
    't3-topbar-layout:registerHeader'
) as InjectionKey<(instance: ComponentPublicInstance) => void>

export const toggleScrollbarSymbol = Symbol(
    't3-topbar-layout:toggleScrollbar'
) as InjectionKey<(disabled: boolean) => void>

export const headerHeightSymbol = Symbol(
    't3-topbar-layout:headerHeight'
) as InjectionKey<Readonly<Ref<string>>>
