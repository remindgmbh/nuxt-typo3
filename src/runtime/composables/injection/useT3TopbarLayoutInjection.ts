import { type InjectionKey, type Ref, inject, provide } from 'vue'
import { useT3Injection } from '#imports'

interface Menu {
    active: Ref<string | undefined>
    close: () => void
    toggle: (id?: string, event?: Event) => void
}

const menuInjectionKey = Symbol('t3-topbar-layout:menu') as InjectionKey<Menu>

const scrollbarDisabledInjectionKey = Symbol(
    't3-topbar-layout:scrollbarDisabled',
) as InjectionKey<Ref<boolean>>

export function useT3TopbarLayoutInjection() {
    const { injectStrict } = useT3Injection()

    function injectOptionalMenu() {
        return inject(menuInjectionKey)
    }

    function injectMenu() {
        return injectStrict(menuInjectionKey)
    }

    function injectOptionalScrollbarDisabled() {
        return inject(scrollbarDisabledInjectionKey)
    }

    function injectScrollbarDisabled() {
        return injectStrict(scrollbarDisabledInjectionKey)
    }

    function provideMenu(menu: Menu) {
        provide(menuInjectionKey, menu)
    }

    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectMenu,
        injectOptionalMenu,
        injectOptionalScrollbarDisabled,
        injectScrollbarDisabled,
        provideMenu,
        provideScrollbarDisabled,
    }
}
