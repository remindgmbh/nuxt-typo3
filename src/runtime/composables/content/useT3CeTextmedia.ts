import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'
import { useT3Breakpoints } from '#nuxt-typo3/composables/useT3Breakpoints'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'
import { useT3TextAsset } from '#nuxt-typo3/composables/content/useT3TextAsset'

export function useT3CeTextmedia(
    contentElement: T3Api.ContentElement<T3Api.Content.Textmedia>,
    config = useT3Config().images.ceTextmedia
) {
    const { breakpointsAsc, getCeBreakpoint } = useT3Breakpoints()
    const { assetIsSmall, type } = useT3TextAsset(contentElement.content)

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

        return breakpointsAsc.value.reduce((result, breakpoint) => {
            if (twoColumnsBreakpoint === breakpoint.name) {
                twoColumns = true
            }
            const divider = !twoColumns ? 1 : assetIsSmall.value ? 3 : 2
            result[breakpoint.name] = breakpoint.containerMaxWidth
                ? `${Math.ceil(breakpoint.containerMaxWidth / divider)}px`
                : `${Math.ceil(100 / divider)}vw`
            return result
        }, {} as { [breakpoint: string]: string })
    })

    return { imageAttrs }
}
