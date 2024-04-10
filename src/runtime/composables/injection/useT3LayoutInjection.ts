import { type InjectionKey, type Ref, inject, provide } from 'vue'
import { useT3Injection } from '#imports'

interface Menu {
    active: Ref<string | undefined>
    close: () => void
    toggle: (id?: string, event?: Event) => void
}

const menuInjectionKey = Symbol('t3-layout:menu') as InjectionKey<Menu>

const scrollbarDisabledInjectionKey = Symbol(
    't3-layout:scrollbarDisabled',
) as InjectionKey<Ref<boolean>>

const headerHeightInjectionKey = Symbol(
    't3-layout:headerHeight',
) as InjectionKey<Ref<string>>

export function useT3LayoutInjection() {
    const { injectStrict } = useT3Injection()

    function injectHeaderHeight(): Ref<string> {
        return injectStrict(headerHeightInjectionKey)
    }

    function injectOptionalHeaderHeight() {
        return inject(headerHeightInjectionKey)
    }

    function injectOptionalMenu() {
        return inject(menuInjectionKey)
    }

    function injectMenu(): Menu {
        return injectStrict(menuInjectionKey)
    }

    function injectOptionalScrollbarDisabled() {
        return inject(scrollbarDisabledInjectionKey)
    }

    function injectScrollbarDisabled(): Ref<boolean> {
        return injectStrict(scrollbarDisabledInjectionKey)
    }

    function provideHeaderHeight(headerHeight: Ref<string>) {
        provide(headerHeightInjectionKey, headerHeight)
    }

    function provideMenu(menu: Menu) {
        provide(menuInjectionKey, menu)
    }

    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectHeaderHeight,
        injectMenu,
        injectOptionalHeaderHeight,
        injectOptionalMenu,
        injectOptionalScrollbarDisabled,
        injectScrollbarDisabled,
        provideHeaderHeight,
        provideMenu,
        provideScrollbarDisabled,
    }
}
