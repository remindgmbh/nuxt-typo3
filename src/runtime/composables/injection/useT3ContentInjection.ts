import { type InjectionKey, type Ref, inject, provide } from 'vue'
import { type T3Model, useT3Injection } from '#imports'

const contentElementInjectionKey = Symbol('t3-content-element') as InjectionKey<
    Ref<T3Model.Typo3.Content.Element<unknown>>
>
export function useT3ContentInjection() {
    const { injectStrict } = useT3Injection()

    function provideContentElement(
        contentElement: Ref<T3Model.Typo3.Content.Element>,
    ) {
        provide(contentElementInjectionKey, contentElement)
    }

    function injectContentElement<T>(): Ref<T3Model.Typo3.Content.Element<T>> {
        return injectStrict<Ref<T3Model.Typo3.Content.Element<T>>>(
            contentElementInjectionKey,
        )
    }

    function injectOptionalContentElement<T>() {
        return inject<Ref<T3Model.Typo3.Content.Element<T>> | undefined>(
            contentElementInjectionKey,
            undefined,
        )
    }

    return {
        injectContentElement,
        injectOptionalContentElement,
        provideContentElement,
    }
}
