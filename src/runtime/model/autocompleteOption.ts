export interface AutocompleteOption {
    key: string
    label: string
    link?: string
    [key: string]: any
}

export interface AutocompleteOptionGroup {
    label?: string
    name: string
    options: AutocompleteOption[]
}
