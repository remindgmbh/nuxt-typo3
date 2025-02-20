import type * as T3Model from '../models'
import type { HookResult } from '@nuxt/schema'
import type { Ref } from 'vue'

declare module '#app' {
    interface RuntimeNuxtHooks {
        'typo3:parseHtml': (el: Ref<HTMLDivElement | undefined>) => HookResult
    }

    interface RuntimeNuxtHooks {
        'typo3:cookieConsent:showBanner': () => HookResult
    }

    interface RuntimeNuxtHooks {
        'typo3:cookieConsent:acceptCookies': (
            category: Omit<T3Model.Typo3.Content.Cookie['category'], 'none'>,
        ) => HookResult
    }
}

export {}
