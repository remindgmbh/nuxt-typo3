import { Base } from '.'

export interface Table extends Base {
    bodytext: string[][]
    tableCaption: string
    tableHeaderPosition: number
    tableTfoot: 0 | 1
}
