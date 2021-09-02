export interface ContentOptions {
    noWrapper?: boolean
    fullWidth?: boolean
}

export class Options {
    layout = {
        container: false,
    }

    content = {
        accordion: {
            noWrapper: true,
        },
        carousel: {
            fullWidth: true,
            noWrapper: true,
        },
        header: {
            subHeaderPosition: 'top' as 'top' | 'bottom',
        },
        image: {
            noWrapper: true,
        },
        tabs: {
            noWrapper: true,
        },
        textpic: {
            noWrapper: true,
        },
    }
}
