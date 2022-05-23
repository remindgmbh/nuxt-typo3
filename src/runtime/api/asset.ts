export interface Asset {
    publicUrl: string
    properties: {
        title?: string
        alternative?: string
        description?: string
        link?: any
        linkData?: any
        mimeType: string
        type: string
        filename: string
        originalUrl: string
        uidLocal: number
        fileReferenceUid: number
        size: string
        dimensions: {
            width: number
            height: number
        }
        cropDimensions: {
            width: number
            height: number
        }
        crop?: {
            [key: string]: {
                cropArea: {
                    x: number
                    y: number
                    width: number
                    height: number
                }
                selectedRatio: string
                focusArea?: any
            }
        }
        autoplay?: 0 | 1
        extension: string
    }
}
