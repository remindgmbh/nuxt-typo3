import { computed } from 'vue'
import screenWidths from '../assets/styles/js/screenWidths.module.scss'
import containerWidths from '../assets/styles/js/containerWidths.module.scss'

export function useT3Breakpoints() {
    const getPxValue = (value: string) => {
        const regex = /^\d+(r?em)$/
        const multiplier = regex.test(value) ? 16 : 1
        return Number.parseInt(value) * multiplier
    }

    const screenWidthsInPx = computed<{ [key: string]: number }>(() =>
        Object.entries(screenWidths).reduce(
            (result, [key, value]) => {
                result[key] = getPxValue(value)
                return result
            },
            {} as { [key: string]: number },
        ),
    )

    const containerWidthsInPx = computed<{ [key: string]: number }>(() =>
        Object.entries(containerWidths).reduce(
            (result, [key, value]) => {
                result[key] = getPxValue(value)
                return result
            },
            {} as { [key: string]: number },
        ),
    )

    const breakpointsAsc = computed<string[]>(() =>
        Object.keys(screenWidthsInPx.value).sort(
            (a, b) =>
                containerWidthsInPx.value[a] - containerWidthsInPx.value[b],
        ),
    )

    const breakpointsDesc = computed<string[]>(() =>
        [...breakpointsAsc.value].reverse(),
    )

    return {
        breakpointsAsc,
        breakpointsDesc,
        containerWidths,
        containerWidthsInPx,
        screenWidths,
        screenWidthsInPx,
    }
}
