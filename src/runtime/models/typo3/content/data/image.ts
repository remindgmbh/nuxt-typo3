import { Asset } from '../..'
import { Header } from '.'

export interface Image extends Header {
    images: Asset[]
}
