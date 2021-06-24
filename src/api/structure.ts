interface Column {
    config: unknown
    elements: unknown[]
}

interface Row {
    columns: Column[]
}

export interface Structure {
    layout: string
    rows: Row[]
}
