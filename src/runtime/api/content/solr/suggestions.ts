export interface Suggestions {
    suggestions?: {
        [key: string]: number
    }
    suggestion?: string
    documents?: Array<{
        link: string
        type: string
        title: string
        content: string
        group: string
        previewImage: string
    }>
    didSecondSearch?: boolean
    status?: false
}
