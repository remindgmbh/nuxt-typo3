import { Pagination } from '../..'
import { Document } from '.'

export interface Result {
    documents: Document[]
    count: number
    query?: string
    pagination: Pagination
}
