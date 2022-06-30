import { Media } from './media'

export interface BaseElement {
    uid: number
    title: string
    teaser: string
    isTopNews: boolean
    crDate: string
    tstamp: string
    datetime: string
    archive?: string
    author: {
        author: string
        authorEmail: string
    }
    media: Media[]
    // TODO specify types
    falRelatedFiles: []
    categories: []
    tags: []
    metaData: {
        keywords: string
        description: string
        alternativeTitle: string
    }
    pathSegment: string
}
