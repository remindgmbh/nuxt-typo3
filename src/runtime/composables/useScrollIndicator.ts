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

export const useScrollIndicator = (
    content: HTMLElement,
    direction: keyof typeof ROOT_MARGINS,
    viewport?: HTMLElement
) => {
    const watch = (callback: (detached: boolean) => void) => {
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
                threshold: [0, Number.MIN_VALUE],
            }
        )
        io.observe(content)
    }

    return {
        watch,
    }
}
