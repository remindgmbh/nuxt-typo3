import { computed } from 'vue'
import { T3Api, useT3Asset } from '#nuxt-typo3'

export function useT3TextAsset(content: T3Api.Content.Textmedia) {
    const asset = computed(() => content.assets.at(0))
    const assetIsSmall = computed(() => content.ratio === 2)
    const assetIsRight = computed(() => content.assetPosition === 'right')
    const type = computed(() => {
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
