import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3Asset } from '#nuxt-typo3/composables/useT3Asset'

export function useT3TextAsset(content: T3Api.Content.Textmedia) {
    const asset = computed<T3Api.Asset | undefined>(() => content.assets.at(0))
    const assetIsSmall = computed<boolean>(() => content.ratio === 2)
    const assetIsRight = computed<boolean>(
        () => content.assetPosition === 'right'
    )
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
