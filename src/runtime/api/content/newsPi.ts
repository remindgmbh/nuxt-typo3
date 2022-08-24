import {
    DetailElement,
    ListElement,
    Pagination,
    Settings,
    Tag,
    Year,
} from './news'
import { Base } from '.'

export interface NewsPiList extends Base {
    data: {
        pagination: Pagination
        list: ListElement[]
        settings: Settings
    }
}

export interface NewsPiTagsList extends Base {
    data: {
        tags: Tag[]
        settings: Settings
    }
}

export interface NewsPiDetails extends Base {
    data: {
        detail: DetailElement
        settings: Settings
    }
}

export interface NewsPiDateMenu extends Base {
    data: {
        years: Year[]
        settings: Settings
    }
}

export type NewsPi =
    | NewsPiList
    | NewsPiTagsList
    | NewsPiDetails
    | NewsPiDateMenu
