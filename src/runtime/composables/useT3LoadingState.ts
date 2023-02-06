import { useState } from '#app'

export function useT3LoadingState() {
    const loadingData = useState<boolean>('loadingData', () => false)
    const loadingPage = useState<boolean>('loadingPage', () => false)

    return {
        loadingData,
        loadingPage,
    }
}
