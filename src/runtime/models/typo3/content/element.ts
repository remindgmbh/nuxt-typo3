import { Appearance, Data, Cookie } from '.'

export interface Element<T extends Data.Base = Data.Base> {
    id: number
    type: string
    colPos: number
    categories: string
    appearance: Appearance
    content: T
    cookie: Cookie
}
