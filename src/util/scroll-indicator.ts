const ROOT_MARGINS = {
    top: '100% 0px -100% 0px',
    right: '0px 100% 0px -100%',
    bottom: '-100% 0px 100% 0px',
    left: '0px -100% 0px 100%',
}

export interface Options {
    viewport?: Element
    content: Element
    direction: keyof typeof ROOT_MARGINS | 'right-fixed'
}

export class ScrollIndicator {
    private content: Element
    private viewport?: Element
    private direction: keyof typeof ROOT_MARGINS | 'right-fixed'

    constructor(options: Options) {
        this.viewport = options.viewport
        this.content = options.content
        this.direction = options.direction

        // Content with auto or percentage width can contain subpixels.
        // This can lead to IntersectionObserver not detecting scrolls to the right,
        // because less than a pixel is missing to intersect.
        if (this.viewport && this.direction === 'right') {
            const content = this.content as HTMLElement

            const resizeObserver = new ResizeObserver(() => {
                content.style.width = '100%'

                const width = parseFloat(getComputedStyle(content).width)
                if (!Number.isInteger(width)) {
                    content.style.width = `${Math.ceil(width)}px`
                }
            })
            resizeObserver.observe(this.viewport)
        }
    }

    public watch(callback: (detached: boolean) => void): void {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) =>
                    // eslint-disable-next-line node/no-callback-literal
                    callback(entry.intersectionRatio !== 0)
                )
            },
            {
                root: this.viewport,
                rootMargin:
                    ROOT_MARGINS[
                        this.direction === 'right-fixed'
                            ? 'right'
                            : this.direction
                    ],
                threshold: [0, Number.MIN_VALUE],
            }
        )
        io.observe(this.content)
    }
}
