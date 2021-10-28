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
        solr_pi_results: {
            paginationPosition: 'bottom' as 'top' | 'bottom' | 'both',
        },
        tabs: {
            noWrapper: true,
        },
        textpic: {
            noWrapper: true,
        },
    }
}
