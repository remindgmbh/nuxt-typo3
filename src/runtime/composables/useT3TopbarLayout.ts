import {
    ComponentPublicInstance,
    InjectionKey,
    Ref,
    inject,
    provide,
} from 'vue'

const registerContentInjectionKey = Symbol(
    't3-topbar-layout:registerContent'
) as InjectionKey<(instance: ComponentPublicInstance) => void>

const registerHeaderInjectionKey = Symbol(
    't3-topbar-layout:registerHeader'
) as InjectionKey<(instance: ComponentPublicInstance) => void>

const scrollbarDisabledInjectionKey = Symbol(
    't3-topbar-layout:scrollbarDisabled'
) as InjectionKey<Ref<boolean>>

export function useT3TopbarLayout() {
    function injectRegisterContent() {
        return inject(registerContentInjectionKey)
    }

    function injectRegisterHeader() {
        return inject(registerHeaderInjectionKey)
    }

    function injectScrollbarDisabled() {
        return inject(scrollbarDisabledInjectionKey)
    }

    function provideRegisterContent(
        registerContent: (instance: ComponentPublicInstance) => void
    ) {
        provide(registerContentInjectionKey, registerContent)
    }

    function provideRegisterHeader(
        registerHeader: (instance: ComponentPublicInstance) => void
    ) {
        provide(registerHeaderInjectionKey, registerHeader)
    }

    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectRegisterContent,
        injectRegisterHeader,
        injectScrollbarDisabled,
        provideRegisterContent,
        provideRegisterHeader,
        provideScrollbarDisabled,
    }
}
