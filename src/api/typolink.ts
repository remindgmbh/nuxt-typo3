export interface Typolink {
    aTagParams: string
    link: string
    target: string
    url: string
    type: 'page' | 'file' | 'folder' | 'email' | 'url' | 'record'
    title: string
}
