import type { Appearance, Cookie } from './index'

export interface Element<T = unknown> {
    id: number
    type: string
    colPos: number
    categories: string
    appearance: Appearance
    content: T
    cookie: Cookie
}
