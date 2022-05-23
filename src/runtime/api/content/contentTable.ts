import { Content } from '#nuxt-typo3/api'

export interface ContentTable extends Content {
    bodytext: string[][]
    tableCaption: string
    tableHeaderPosition: number
    tableTfoot: 0 | 1
}
