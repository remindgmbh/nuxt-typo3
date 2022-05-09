import { Appearance, Content } from '.'

export interface ContentElement {
    id: number
    type: string
    colPos: number
    categories: string
    appearance: Appearance
    content: Content
}
