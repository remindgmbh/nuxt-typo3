import { computed } from 'vue'
import { Api, useConfig, useBreakpoints } from '#nuxt-typo3'

export function useCeImage(
    contentElement: Api.ContentElement<Api.Content.Image>
) {
    const { breakpoints } = useBreakpoints()
    const config = useConfig().images.ceImage

    const image = computed(() => contentElement.content.images.at(0))

    const imageAttrs = computed(() => ({
        sizes: config.responsive ? sizes.value : undefined,
        loading: config.lazy ? 'lazy' : undefined,
    }))

    const sizes = computed(() =>
        breakpoints.value
            .reduce((result, breakpoint) => {
                result.push(
                    `${breakpoint.name}:${
                        breakpoint.containerMaxWidth
                            ? `${breakpoint.containerMaxWidth}px`
                            : '100vw'
                    }`
                )
                return result
            }, [] as string[])
            .join(' ')
    )

    return { image, imageAttrs }
}
