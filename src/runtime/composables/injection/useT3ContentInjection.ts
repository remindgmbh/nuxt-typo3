import { type InjectionKey, type Ref, inject, provide } from 'vue'
import { Typo3 } from '../../models'
import { useT3Injection } from '#imports'

const contentElementInjectionKey = Symbol('t3-content-element') as InjectionKey<
    Ref<Typo3.Content.Element<unknown>>
>
export function useT3ContentInjection() {
    const { injectStrict } = useT3Injection()

    function provideContentElement(contentElement: Ref<Typo3.Content.Element>) {
        provide(contentElementInjectionKey, contentElement)
    }

    function injectContentElement<T>(): Ref<Typo3.Content.Element<T>> {
        return injectStrict<Ref<Typo3.Content.Element<T>>>(
            contentElementInjectionKey,
        )
    }

    function injectOptionalContentElement<T>() {
        return inject<Ref<Typo3.Content.Element<T>> | undefined>(
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
