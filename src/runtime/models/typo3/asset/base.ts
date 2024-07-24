import type { TypoLink } from '../index'

export interface Base {
    url: string
    fileReferenceUid: number
    type: string
    extension: string
    title?: string
    description?: string
    lazyLoading: boolean
    link?: TypoLink
}
