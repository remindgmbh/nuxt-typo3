import { DetailElement, ListElement, Pagination, Settings } from './news'
import { Base } from '.'

export interface NewsPi extends Base {
    data: {
        pagination?: Pagination
        list?: ListElement[]
        settings: Settings
        detail?: DetailElement
    }
}
