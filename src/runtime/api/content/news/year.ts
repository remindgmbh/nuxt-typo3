interface Month {
    title: string
    slug: string
    active: boolean
    count: number
}

export interface Year {
    title: number
    slug: string
    active: boolean
    count: number
    months?: Month[]
}
