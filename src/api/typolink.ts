export interface Typolink {
    aTagParams: string
    link: string
    target: string
    type: string
    url: 'page' | 'file' | 'folder' | 'email' | 'url' | 'record'
    title: string
}
