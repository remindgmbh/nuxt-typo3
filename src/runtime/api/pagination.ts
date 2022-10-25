export interface Pagination {
    first: string
    last: string
    prev?: string
    next?: string
    pages: Array<{
        pageNumber: number
        link: string
        current: boolean
    }>
}
