import { ComponentPublicInstance, InjectionKey, Ref } from 'vue'

export const registerContentSymbol = Symbol('registerTrigger') as InjectionKey<
    (instance: ComponentPublicInstance) => void
>

export const setActiveItemIdSymbol = Symbol(
    't3-menu:setActiveItemId'
) as InjectionKey<(key: string | null) => void>

export const activeItemIdSymbol = Symbol(
    't3-menu:activeItemId'
) as InjectionKey<Readonly<Ref<string | null>>>
