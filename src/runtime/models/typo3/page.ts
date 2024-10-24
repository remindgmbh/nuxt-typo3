import type { Breadcrumb, Content, Language } from './index'
import type { MetaObject } from '@nuxt/schema'

export interface Page {
    id: number
    type: string
    slug: string
    media: any[]
    seo: MetaObject
    categories: string
    breadcrumbs: Breadcrumb[]
    appearance: {
        layout: string
        backendLayout: string
        breadcrumbsBackgroundColor: string
    }
    content: {
        [colPos: string]: Content.Element[]
    }
    i18n: Language[]
}
