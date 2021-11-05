import { Image } from './image'
import { Typolink } from './typolink'

export interface Item {
    id: number
    pid: number
    header: string
    headerLayout: number
    headerPosition: string
    headerLink?: Typolink
    subheader: string
    bodytext: string
    images: Image[]
}
