import { type InjectionKey, type Ref, inject, provide } from 'vue'
import { useT3Injection } from '#imports'

const menuVisibleInjectionKey = Symbol(
    't3-topbar-layout:menuVisible',
) as InjectionKey<Ref<boolean>>

const scrollbarDisabledInjectionKey = Symbol(
    't3-topbar-layout:scrollbarDisabled',
) as InjectionKey<Ref<boolean>>

export function useT3TopbarLayoutInjection() {
    const { injectStrict } = useT3Injection()

    function injectOptionalMenuVisible() {
        return inject(menuVisibleInjectionKey)
    }

    function injectMenuVisible() {
        return injectStrict(menuVisibleInjectionKey)
    }

    function injectOptionalScrollbarDisabled() {
        return inject(scrollbarDisabledInjectionKey)
    }

    function injectScrollbarDisabled() {
        return injectStrict(scrollbarDisabledInjectionKey)
    }

    function provideMenuVisible(menuVisible: Ref<boolean>) {
        provide(menuVisibleInjectionKey, menuVisible)
    }

    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectMenuVisible,
        injectOptionalMenuVisible,
        injectOptionalScrollbarDisabled,
        injectScrollbarDisabled,
        provideMenuVisible,
        provideScrollbarDisabled,
    }
}
