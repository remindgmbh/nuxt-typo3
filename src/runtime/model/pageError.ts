import { T3Api } from '#nuxt-typo3'

export class PageError {
    data?: T3Api.PageData
    message?: string
    url?: string
    status?: number
    statusText?: string
}
