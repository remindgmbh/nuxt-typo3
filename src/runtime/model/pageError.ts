import * as T3Api from '../api'

export class PageError {
    data?: T3Api.PageData
    message?: string
    url?: string
    status?: number
    statusText?: string
}
