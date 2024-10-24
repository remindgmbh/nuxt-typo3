import type { T3Model } from '#imports'

export class PageError {
    data?: T3Model.Typo3.Page
    html?: string
    status: number = 500
}
