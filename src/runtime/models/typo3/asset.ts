import type { TypoLink } from '.'

export interface Asset {
    publicUrl: string
    properties: {
        title?: string
        alternative?: string
        description?: string
        link?: string
        linkData?: TypoLink
        mimeType: string
        type: string
        filename: string
        originalUrl: string
        uidLocal: number
        fileReferenceUid: number
        size: string
        dimensions: {
            width: number
            height: number
        }
        autoplay?: 0 | 1
        extension: string
        lazyLoading: boolean
    }
}
