import { Typolink } from './typolink'

export interface SearchForm {
    targetPage: string
    pluginNamespace: string
    queryParams: {
        q: string
        page: string
    }
}

export interface SearchPagination {
    current: number
    numberOfPages: number
}

export interface SearchDocument {
    title: string
    content: string
    url: Typolink
}

interface SearchDocuments {
    pagination: SearchPagination
    list: SearchDocument[]
    count: number
}

export interface SearchResult {
    documents: SearchDocuments
    allResultCount: number
    query: string
}
