import type { Breadcrumb, Content, Language } from '../index'
import type { Meta } from './index'

export interface Data {
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
        breadcrumbsBackgroundColor: string
    }
    content: {
        [colPos: string]: Content.Element[]
    }
    i18n: Language[]
}
