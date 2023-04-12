import { useState } from '#imports'

export function useT3LoadingState() {
    const loadingData = useState<boolean>('loadingData', () => false)
    const loadingPage = useState<boolean>('loadingPage', () => false)

    return {
        loadingData,
        loadingPage,
    }
}
