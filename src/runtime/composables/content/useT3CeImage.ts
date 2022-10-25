import { computed } from 'vue'
import { T3Api, useT3Config, useT3Breakpoints } from '#nuxt-typo3'

export function useT3CeImage(
    contentElement: T3Api.ContentElement<T3Api.Content.Image>
) {
    const { breakpointsAsc } = useT3Breakpoints()
    const config = useT3Config().images.ceImage

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
