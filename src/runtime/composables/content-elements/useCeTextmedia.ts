import { computed } from 'vue'
import { ContentTextmedia } from '#nuxt-typo3/api'

export const useCeTextmedia = (
    props: Readonly<{
        id: number
        content: ContentTextmedia
    }>
) => {
    const asset = computed(() => props.content.assets.at(0))
    const assetIsSmall = computed(() => props.content.ratio === 2)
    const assetIsRight = computed(() => props.content.assetPosition === 'right')
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
