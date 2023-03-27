import { computed } from 'vue'
import { T3Api, T3Model } from '#nuxt-typo3'
import { useT3Breakpoints } from '#nuxt-typo3/composables/useT3Breakpoints'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'

export function useT3CeImage(
    contentElement: T3Api.ContentElement<T3Api.Content.Image>
) {
    const { breakpointsAsc } = useT3Breakpoints()
    const config = useT3Config().contentElements.image

    const image = computed(() => contentElement.content.images.at(0))

    const imageAttrs = computed(() => ({
        sizes: config?.images?.responsive === false ? undefined : sizes.value,
        fileExtension: config?.images?.fileExtension,
    }))

    const sizes = computed(() =>
        breakpointsAsc.value.reduce((result, breakpoint) => {
            result[breakpoint.name] = breakpoint.containerMaxWidth
                ? `${breakpoint.containerMaxWidth}px`
                : '100vw'
            return result
        }, {} as T3Model.ImageSizes)
    )

    return { image, imageAttrs }
}
