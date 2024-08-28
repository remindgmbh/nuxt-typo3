import type { Asset } from '../../index'
import type { Header } from './index'

export interface Uploads extends Header {
    media: Asset.Base[]
}
