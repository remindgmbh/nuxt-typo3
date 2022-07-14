import { computed } from 'vue'
import { Api, Model } from '#nuxt-typo3'

export function useAsset(asset: Api.Asset) {
    const image = computed<Model.Image>(() => ({
        src: asset.publicUrl,
        alt: asset.properties.alternative,
        height: asset.properties.dimensions.height,
        width: asset.properties.dimensions.width,
        title: asset.properties.title,
        description: asset.properties.description,
    }))

    return { image }
}
