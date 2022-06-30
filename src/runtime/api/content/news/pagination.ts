export interface Pagination {
    first: string
    last: string
    prev?: string
    next?: string
    pages: Array<{
        page: number
        link: string
        current: 0 | 1
    }>
}
