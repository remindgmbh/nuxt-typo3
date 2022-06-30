import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

export function useCeTextmedia(content: Api.Content.Textmedia) {
    const asset = computed(() => content.assets.at(0))
    const assetIsSmall = computed(() => content.ratio === 2)
    const assetIsRight = computed(() => content.assetPosition === 'right')
    const assetIsVideo = computed(
        () => asset.value?.properties.type === 'video'
    )

    return {
        asset,
        assetIsSmall,
        assetIsRight,
        assetIsVideo,
    }
}
