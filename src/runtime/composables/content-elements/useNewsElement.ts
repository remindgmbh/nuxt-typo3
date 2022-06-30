import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

export function useNewsElement(element: Api.Content.News.BaseElement) {
    const media = computed(() => element.media.at(0))

    const listViewImage = computed(() => getImage('listViewImage'))
    const detailViewImage = computed(() => getImage('defaultImage'))
    const mediaProperties = computed(() => media.value?.properties)

    function getImage(
        type:
            | 'defaultImage'
            | 'detailViewImage'
            | 'listViewImage'
            | 'listViewFeaturedImage'
            | 'listViewVerticalImage'
    ) {
        return media.value && media.value.type === 'image' && media.value.images
            ? media.value.images[type]
            : undefined
    }

    return {
        detailViewImage,
        listViewImage,
        mediaProperties,
    }
}
