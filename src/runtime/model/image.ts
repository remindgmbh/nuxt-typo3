export interface Image {
    uid?: number
    src?: string
    maxHeight?: number
    maxWidth?: number
    height: number
    width: number
    alt?: string
    title?: string
    description?: string
    [key: string]: any
}
