import { computed } from 'vue'
import * as T3Api from '../../api'
import { useT3Asset } from '#imports'

export function useT3TextAsset(content: T3Api.Content.Textmedia) {
    const asset = computed<T3Api.Asset | undefined>(() => content.assets.at(0))
    const assetIsSmall = computed<boolean>(() => content.ratio === 2)
    const assetIsRight = computed<boolean>(
        () => content.assetPosition === 'right'
    )
    const type = computed<string | undefined>(() => {
        if (asset.value) {
            const { type } = useT3Asset(asset.value)
            return type.value
        } else {
            return undefined
        }
    })

    return {
        asset,
        assetIsSmall,
        assetIsRight,
        type,
    }
}
