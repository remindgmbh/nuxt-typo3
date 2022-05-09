import { Breadcrumb, ContentElement, Language, Meta } from '.'

export interface PageData {
    id: number
    type: string
    slug: string
    media: any[]
    meta: Meta
    categories: string
    breadcrumbs: Breadcrumb[]
    appearance: {
        layout: string
        backendLayout: string
    }
    content: {
        [colPos: string]: ContentElement[]
    }
    i18n: Language[]
}
