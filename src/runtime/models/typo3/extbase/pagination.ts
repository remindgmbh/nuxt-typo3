export interface Pagination {
    startRecordNumber: number
    endRecordNumber: number
    first: string
    last: string
    prev?: string
    next?: string
    pages: Array<{
        pageNumber: number
        link: string
        active: boolean
    }>
}
