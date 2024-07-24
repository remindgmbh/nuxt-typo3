import type { Base } from './index'

export interface Image extends Base {
    alternative?: string
    dimensions: {
        width: number
        height: number
    }
}
