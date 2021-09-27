export interface Navigation {
    active: number
    children: Navigation[]
    current: number
    link: string
    space: number
    target: string
    title: string
    overviewLabel?: string
}
