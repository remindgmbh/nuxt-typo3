import { Appearance, Cookie } from '.'

export interface Element<T = {}> {
    id: number
    type: string
    colPos: number
    categories: string
    appearance: Appearance
    content: T
    cookie: Cookie
}
