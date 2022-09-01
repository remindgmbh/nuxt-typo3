import { computed } from 'vue'
import { Api, useAsset } from '#nuxt-typo3'

export function useTextAsset(content: Api.Content.Textmedia) {
    const asset = computed(() => content.assets.at(0))
    const assetIsSmall = computed(() => content.ratio === 2)
    const assetIsRight = computed(() => content.assetPosition === 'right')
    const type = computed(() => {
        if (asset.value) {
            const { type } = useAsset(asset.value)
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
