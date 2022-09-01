import { computed } from 'vue'
import { Api, useConfig, useBreakpoints, useTextAsset } from '#nuxt-typo3'

export function useCeTextmedia(
    contentElement: Api.ContentElement<Api.Content.Textmedia>,
    config = useConfig().images.ceTextmedia
) {
    const { breakpoints, getCeBreakpoint } = useBreakpoints()
    const { assetIsSmall, type } = useTextAsset(contentElement.content)

    const imageAttrs = computed(() => {
        if (type.value === 'image') {
            return {
                sizes: config.responsive ? sizes.value : undefined,
                loading: config.lazy ? 'lazy' : undefined,
            }
        } else {
            return undefined
        }
    })

    const sizes = computed(() => {
        const twoColumnsBreakpoint = getCeBreakpoint(
            contentElement.type,
            `two-columns-${assetIsSmall ? 'small-asset' : 'large-asset'}`
        )
        let twoColumns = false

        return breakpoints.value
            .reduce((result, breakpoint) => {
                if (twoColumnsBreakpoint === breakpoint.name) {
                    twoColumns = true
                }
                const divider = !twoColumns ? 1 : assetIsSmall.value ? 3 : 2
                result.push(
                    `${breakpoint.name}:${
                        breakpoint.containerMaxWidth
                            ? `${breakpoint.containerMaxWidth / divider}px`
                            : `${100 / divider}vw`
                    }`
                )
                return result
            }, [] as string[])
            .join(' ')
    })

    return { imageAttrs }
}
