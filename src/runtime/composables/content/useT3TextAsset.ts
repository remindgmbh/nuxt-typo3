import * as T3Model from '../../models'
import { computed } from 'vue'
import { useT3Asset } from '#imports'

export function useT3TextAsset(content: T3Model.Typo3.Content.Data.TextAsset) {
    const asset = computed<T3Model.Typo3.Asset | undefined>(() =>
        content.assets.at(0),
    )
    const assetIsSmall = computed<boolean>(() => content.ratio === 2)
    const assetIsRight = computed<boolean>(
        () => content.assetPosition === 'right',
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
        assetIsRight,
        assetIsSmall,
        type,
    }
}
