import { computed } from 'vue'
import { Api, useConfig, useBreakpoints } from '#nuxt-typo3'

export function useCeImage(
    contentElement: Api.ContentElement<Api.Content.Image>
) {
    const { breakpointsAsc } = useBreakpoints()
    const config = useConfig().images.ceImage

    const image = computed(() => contentElement.content.images.at(0))

    const imageAttrs = computed(() => ({
        sizes: config.responsive ? sizes.value : undefined,
        loading: config.lazy ? 'lazy' : undefined,
    }))

    const sizes = computed(() =>
        breakpointsAsc.value.reduce((result, breakpoint) => {
            result[breakpoint.name] = breakpoint.containerMaxWidth
                ? `${breakpoint.containerMaxWidth}px`
                : '100vw'
            return result
        }, {} as { [breakpoint: string]: string })
    )

    return { image, imageAttrs }
}
