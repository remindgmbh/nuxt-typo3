import { Content } from '..'

export interface ContentTable extends Content {
    bodytext: string[][]
    tableCaption: string
    tableHeaderPosition: number
    tableTfoot: 0 | 1
}
