const ROOT_MARGINS = {
    top: '100% 0px -100% 0px',
    right: '0px 100% 0px -100%',
    bottom: '-100% 0px 100% 0px',
    left: '0px -100% 0px 100%',
}

export interface Options {
    viewport?: Element
    content: Element
    direction: keyof typeof ROOT_MARGINS
}

export class ScrollIndicator {
    private content: Element
    private viewport?: Element
    private direction: keyof typeof ROOT_MARGINS

    constructor(options: Options) {
        this.viewport = options.viewport
        this.content = options.content
        this.direction = options.direction
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
                rootMargin: ROOT_MARGINS[this.direction],
                threshold: [0, 1e-12],
            }
        )
        io.observe(this.content)
    }
}
