import type { Data } from '.'

export class Error {
    data?: Data
    message?: string
    url?: string
    status?: number
    statusText?: string
}
