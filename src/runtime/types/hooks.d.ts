import type { HookResult } from '@nuxt/schema'
import { type Ref } from 'vue'

declare module '#app' {
    interface RuntimeNuxtHooks {
        'typo3:parseHtml': (
            el: Ref<HTMLDivElement | undefined>,
            content: Ref<string>,
        ) => HookResult
    }
}

export {}
