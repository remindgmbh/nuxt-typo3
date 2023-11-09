import type { Header } from '.'

export interface Table extends Header {
    bodytext: string[][]
    tableCaption: string
    tableHeaderPosition: number
    tableTfoot: 0 | 1
}
