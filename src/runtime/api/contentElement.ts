import { Appearance, Content, Cookie } from '.'

export interface ContentElement<T extends Content.Base = Content.Base> {
    id: number
    type: string
    colPos: number
    categories: string
    appearance: Appearance
    content: T
    cookie: Cookie
}
