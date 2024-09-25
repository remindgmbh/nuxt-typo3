import { computed } from 'vue'
import containerWidths from '../assets/styles/js/containerWidths.module.scss'
import screenWidths from '../assets/styles/js/screenWidths.module.scss'

export function useT3Breakpoints() {
    const valueToPx = (value: string) => {
        const regex = /^\d+r?em$/
        const multiplier = regex.test(value) ? 16 : 1
        return Number.parseInt(value) * multiplier
    }

    const objectToPx = (o: { [key: string]: string }) =>
        Object.entries(o).reduce(
            (result, [key, value]) => {
                result[key] = valueToPx(value)
                return result
            },
            {} as { [key: string]: number },
        )

    const screenWidthsInPx = computed<{ [key: string]: number }>(() =>
        objectToPx(screenWidths),
    )

    const containerWidthsInPx = computed<{ [key: string]: number }>(() =>
        objectToPx(containerWidths),
    )

    const breakpointsAsc = computed<string[]>(() =>
        Object.keys(screenWidthsInPx.value).sort(
            (a, b) => screenWidthsInPx.value[a] - screenWidthsInPx.value[b],
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
