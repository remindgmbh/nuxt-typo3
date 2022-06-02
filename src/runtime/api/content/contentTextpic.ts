import { Asset, ContentText } from '..'

export interface ContentTextpic extends ContentText {
    images: Asset[]
    imagePosition: 'right' | 'left'
    ratio: number
}
