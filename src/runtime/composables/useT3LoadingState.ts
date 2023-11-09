import { type Ref } from 'vue'
import { type RouteLocationNormalized } from 'vue-router'
import { useState } from '#imports'

export function useT3LoadingState(): Ref<{
    type?: 'data' | 'page' | undefined
    from?: RouteLocationNormalized | undefined
    to?: RouteLocationNormalized | undefined
}> {
    return useState<{
        type?: 'data' | 'page'
        from?: RouteLocationNormalized
        to?: RouteLocationNormalized
    }>('t3-loading', () => ({}))
}
