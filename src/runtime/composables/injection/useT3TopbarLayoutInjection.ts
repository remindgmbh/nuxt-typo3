import { type InjectionKey, type Ref, inject, provide } from 'vue'

const menuVisibleInjectionKey = Symbol(
    't3-topbar-layout:menuVisible',
) as InjectionKey<Ref<boolean>>

const scrollbarDisabledInjectionKey = Symbol(
    't3-topbar-layout:scrollbarDisabled',
) as InjectionKey<Ref<boolean>>

export function useT3TopbarLayoutInjection() {
    function injectMenuVisible() {
        return inject(menuVisibleInjectionKey)
    }
    function provideMenuVisible(menuVisible: Ref<boolean>) {
        provide(menuVisibleInjectionKey, menuVisible)
    }

    function injectScrollbarDisabled() {
        return inject(scrollbarDisabledInjectionKey)
    }
    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectMenuVisible,
        injectScrollbarDisabled,
        provideMenuVisible,
        provideScrollbarDisabled,
    }
}
