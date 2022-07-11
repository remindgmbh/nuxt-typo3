export function useUtil() {
    function debounce(fn: (...args: any[]) => any, timeout = 300) {
        let timer: NodeJS.Timeout
        return (...args: any[]) => {
            clearTimeout(timer)
            timer = setTimeout(() => fn(args), timeout)
        }
    }

    return {
        debounce,
    }
}
