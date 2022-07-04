export interface IPagination {
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

export class Pagination implements IPagination {
    first: string
    last: string
    prev?: string
    next?: string
    pages: Array<{
        link: string
        current: boolean
        pageNumber: number
    }>

    constructor(pagination: IPagination) {
        this.first = pagination.first
        this.last = pagination.last
        this.prev = pagination.prev
        this.next = pagination.next
        this.pages = pagination.pages
    }
}
