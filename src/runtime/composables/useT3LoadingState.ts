import { Ref } from 'vue'
import { useState } from '#imports'

export function useT3LoadingState() {
    const loadingData: Ref<boolean> = useState<boolean>(
        'loadingData',
        () => false
    )
    const loadingPage: Ref<boolean> = useState<boolean>(
        'loadingPage',
        () => false
    )

    return {
        loadingData,
        loadingPage,
    }
}
