import type { Language, NavItem } from '.'

export interface InitialData {
    navigation: NavItem[]
    i18n: Language[]
    user: {
        logged: boolean
        logoutLink?: string
    }
}
