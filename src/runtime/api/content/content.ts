import { TypoLink } from '#nuxt-typo3/api'

export interface Content {
    header?: string
    headerLayout: number
    headerPosition?: string
    headerLink?: TypoLink
    subheader?: string
}
