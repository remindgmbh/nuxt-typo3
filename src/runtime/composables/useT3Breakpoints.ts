import { computed } from 'vue'
import breakpointsModule from '#nuxt-typo3/assets/styles/js/breakpoints.module.scss'
import containerMaxWidthsModule from '#nuxt-typo3/assets/styles/js/containerMaxWidths.module.scss'

interface Breakpoint {
    name: string
    screenWidth: number
    containerMaxWidth: number
}

export function useT3Breakpoints() {
    const screenWidths = computed<{ [key: string]: number }>(() =>
        Object.entries(breakpointsModule).reduce((result, [key, value]) => {
            result[key] = Number.parseInt(value)
            return result
        }, {} as { [key: string]: number })
    )

    const containerMaxWidths = computed<{ [key: string]: number }>(() =>
        Object.entries(containerMaxWidthsModule).reduce(
            (result, [key, value]) => {
                result[key] = Number.parseInt(value)
                return result
            },
            {} as { [key: string]: number }
        )
    )

    const breakpoints = computed<{ [name: string]: Breakpoint }>(() =>
        Object.entries(screenWidths.value).reduce(
            (result, [name, screenWidth]) => {
                result[name] = {
                    name,
                    screenWidth,
                    containerMaxWidth: containerMaxWidths.value[name],
                }
                return result
            },
            {} as { [name: string]: Breakpoint }
        )
    )

    const breakpointsAsc = computed<Breakpoint[]>(() =>
        Object.values(breakpoints.value).sort(
            (a, b) => a.screenWidth - b.screenWidth
        )
    )

    const breakpointsDesc = computed<Breakpoint[]>(() =>
        [...breakpointsAsc.value].reverse()
    )

    return {
        breakpoints,
        breakpointsAsc,
        breakpointsDesc,
        containerMaxWidths,
        screenWidths,
    }
}
