import { Image, TypoLink } from '.'
export interface Meta {
    title: string
    subtitle: string
    abstract: string
    description: string
    keywords: string
    canonical: TypoLink
    robots: {
        noIndex: boolean
        noFollow: boolean
    }
    author: string
    authorEmail: string
    ogTitle: string
    ogDescription: string
    ogImage?: Image
    twitterTitle: string
    twitterDescription: string
    twitterCard: string
    twitterImage?: Image
}
