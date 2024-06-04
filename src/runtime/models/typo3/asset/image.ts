import type { Base } from './base'

export interface Image extends Base {
    alternative?: string
    dimensions: {
        width: number
        height: number
    }
}
