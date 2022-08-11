export interface Pagination {
    first: string
    last: string
    prev?: string
    next?: string
    pages: Array<{
        link: string
        current: boolean
        pageNumber: number
    }>
}
