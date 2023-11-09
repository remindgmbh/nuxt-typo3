import type { Asset } from '../..'
import type { Header } from '.'

export interface Image extends Header {
    images: Asset[]
}
