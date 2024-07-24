import type { Asset } from '../../index'
import type { Header } from './index'

export interface Image extends Header {
    image: Asset.Image
}
