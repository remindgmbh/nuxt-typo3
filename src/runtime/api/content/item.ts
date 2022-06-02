import { Asset, ContentText } from '..'

export interface Item extends ContentText {
    id: number
    pid: number
    title: string
    images: Asset[]
}
