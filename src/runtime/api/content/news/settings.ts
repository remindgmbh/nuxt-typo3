export interface Settings {
    orderBy?: string
    orderDirection?: 'asc' | 'desc'
    templateLayout: string
    action: 'list' | 'detail' | 'tagsList' | 'dateMenu' | 'categoryMenu'
}
