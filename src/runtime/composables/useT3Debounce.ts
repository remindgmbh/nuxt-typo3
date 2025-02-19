import { ref } from 'vue'

export function useT3Debounce<T>(
    callback: (...args: any[]) => PromiseLike<T> | T,
    timeout = 500,
) {
    let timer: NodeJS.Timeout | undefined
    const promise = ref<PromiseLike<T>>()

    const debounce = (...args: any[]): PromiseLike<unknown> => {
        promise.value = new Promise((resolve, reject) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                try {
                    resolve(callback(...args))
                } catch (error) {
                    reject(error)
                }
            }, timeout)
        })

        return promise.value
    }

    return {
        debounce,
        promise,
    }
}
