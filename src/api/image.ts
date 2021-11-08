export interface Image {
    properties: {
        dimensions: {
            height: number
            width: number
        }
        alternative?: string
        title?: string
        link?: string
        originalUrl: string
    }
    publicUrl: string
}
