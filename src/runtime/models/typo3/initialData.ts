import type { Language, NavItem } from './index'

export interface InitialData {
    footer: unknown
    navigation: NavItem[]
    i18n: Language[]
    user?: {
        logged: boolean
        logoutLink?: string
    }
    [key: string]: unknown
}
