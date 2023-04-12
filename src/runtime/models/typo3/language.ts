export interface Language {
    languageId: number
    locale: string
    title: string
    navigationTitle: string
    twoLetterIsoCode: string
    hreflang: string
    direction: string
    flag: string
    link: string
    active: 0 | 1
    current: 0 | 1
    available: 0 | 1
}
