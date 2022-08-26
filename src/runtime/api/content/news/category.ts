export interface Category {
    uid?: number
    pid?: number
    title: string
    slug: string
    active: boolean
    count: number
    seo?: {
        title: string
        description: string
        headline: string
        text: string
    }
}
