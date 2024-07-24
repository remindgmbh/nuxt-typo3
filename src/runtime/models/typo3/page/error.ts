import type { Data } from './index'

export class Error {
    data?: Data
    message?: string
    url?: string
    status?: number
    statusText?: string
}
