export interface ContentOptions {
    wrapper?: boolean
    fullWidth?: boolean
}

export class Options {
    layout = {
        container: false,
    }

    content = {
        header: {
            wrapper: true,
            subHeaderPosition: 'top' as 'top' | 'bottom',
        },
        solr_pi_results: {
            paginationPosition: 'bottom' as 'top' | 'bottom' | 'both',
        },
        text: {
            wrapper: true,
        },
    }
}
