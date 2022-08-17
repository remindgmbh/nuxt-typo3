const ROOT_MARGINS = {
    top: '100% 0px -100% 0px',

    // Content with auto or percentage width can contain subpixels.
    // This can lead to IntersectionObserver not detecting scrolls to the right,
    // because less than a pixel is missing to intersect. So instead of moving
    // the left margin 100% to the right 101% will be used.
    right: '0px 100% 0px -101%',
    bottom: '-100% 0px 100% 0px',
    left: '0px -100% 0px 100%',
}

export function useUtil() {
    function capitalize(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

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

    function detectScrollEnd(
        content: HTMLElement,
        direction: keyof typeof ROOT_MARGINS,
        callback: (detached: boolean) => void,
        viewport?: HTMLElement
    ) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) =>
                    // eslint-disable-next-line n/no-callback-literal
                    callback(entry.intersectionRatio !== 0)
                )
            },
            {
                root: viewport,
                rootMargin: ROOT_MARGINS[direction],
                threshold: [0, 1e-12],
            }
        )
        io.observe(content)
    }

    return {
        capitalize,
        debounce,
        detectScrollEnd,
        padNumber,
        throttle,
    }
}
