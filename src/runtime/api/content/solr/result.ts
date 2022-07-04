import { ListItem } from './listItem'

export interface Result {
    documents: {
        pagination: {
            current: number
            numberOfPages: number
        }
        list: ListItem[]
        count: number
    }
    allResultCount: number
    query?: string
}
