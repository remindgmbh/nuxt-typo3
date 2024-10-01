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

const detachedInjectionKey = Symbol('t3-layout:detached') as InjectionKey<
    Ref<boolean>
>

export function useT3LayoutInjection() {
    const { injectStrict } = useT3Injection()

    function injectDetached(): Ref<boolean> {
        return injectStrict(detachedInjectionKey)
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

    function provideDetached(detached: Ref<boolean>) {
        provide(detachedInjectionKey, detached)
    }

    function provideMenu(menu: Menu) {
        provide(menuInjectionKey, menu)
    }

    function provideScrollbarDisabled(scrollbarDisabled: Ref<boolean>) {
        provide(scrollbarDisabledInjectionKey, scrollbarDisabled)
    }

    return {
        injectDetached,
        injectMenu,
        injectOptionalMenu,
        injectOptionalScrollbarDisabled,
        injectScrollbarDisabled,
        provideDetached,
        provideMenu,
        provideScrollbarDisabled,
    }
}
