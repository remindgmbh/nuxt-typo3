import type { PaginationPage } from './index'

export interface Pagination {
    startRecordNumber: number
    endRecordNumber: number
    first: string
    last: string
    prev?: string
    next?: string
    pages: PaginationPage[]
}
