export function useUtil() {
    function debounce(fn: (...args: any[]) => any, timeout = 300) {
        let timer: NodeJS.Timeout
        return (...args: any[]) => {
            clearTimeout(timer)
            timer = setTimeout(() => fn(...args), timeout)
        }
    }

    function throttle(fn: (...args: any[]) => any, timeout = 300) {
        let timer: NodeJS.Timeout | undefined
        return (...args: any[]) => {
            if (timer) {
                return
            }
            timer = setTimeout(() => {
                fn(...args)
                timer = undefined
            }, timeout)
        }
    }

    function padNumber(value: number, maxValue: number) {
        return value.toString().padStart(maxValue.toString().length, '0')
    }

    return {
        debounce,
        padNumber,
        throttle,
    }
}
