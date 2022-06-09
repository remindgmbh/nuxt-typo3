import { Api } from '#nuxt-typo3'

export class PageError {
    data?: Api.PageData
    message?: string
    url?: string
    status?: number
    statusText?: string
}
