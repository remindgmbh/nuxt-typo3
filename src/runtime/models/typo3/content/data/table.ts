import type { Header } from './index'

export interface Table extends Header {
    bodytext: string[][]
    tableCaption: string
    tableHeaderPosition: number
    tableTfoot: 0 | 1
}
