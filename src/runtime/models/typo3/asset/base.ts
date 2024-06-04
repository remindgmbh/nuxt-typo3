import type { TypoLink } from '..'

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
