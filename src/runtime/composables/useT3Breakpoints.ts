import { computed } from 'vue'
import breakpointsModule from '#nuxt-typo3/assets/styles/js/breakpoints.module.scss'
import ceBreakpointsModule from '#nuxt-typo3/assets/styles/js/ce-breakpoints.module.scss'
import containerMaxWidthsModule from '#nuxt-typo3/assets/styles/js/containerMaxWidths.module.scss'

interface Breakpoint {
    name: string
    screenWidth: number
    containerMaxWidth: number
}

export function useT3Breakpoints() {
    function getCeBreakpoint(type: string, name: string) {
        return ceBreakpointsModule[`${type}-${name}`]
    }

    const screenWidths = computed(() =>
        Object.entries(breakpointsModule).reduce((result, [key, value]) => {
            result[key] = Number.parseInt(value)
            return result
        }, {} as { [key: string]: number })
    )

    const containerMaxWidths = computed(() =>
        Object.entries(containerMaxWidthsModule).reduce(
            (result, [key, value]) => {
                result[key] = Number.parseInt(value)
                return result
            },
            {} as { [key: string]: number }
        )
    )

    const breakpointsAsc = computed<Breakpoint[]>(() =>
        Object.entries(screenWidths.value)
            .map(([key, value]) => ({
                name: key,
                screenWidth: value,
                containerMaxWidth: containerMaxWidths.value[key],
            }))
            .sort((a, b) => a.screenWidth - b.screenWidth)
    )

    const breakpointsDesc = computed<Breakpoint[]>(() =>
        [...breakpointsAsc.value].reverse()
    )

    return {
        breakpointsAsc,
        breakpointsDesc,
        containerMaxWidths,
        screenWidths,
        getCeBreakpoint,
    }
}
