export interface Image {
    src: string
    height: number
    width: number
    alt?: string
    title?: string
    description?: string
    [key: string]: any
}
