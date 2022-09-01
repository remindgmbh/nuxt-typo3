import { defineNuxtPlugin } from '#imports'
import { useBreakpoints } from '#nuxt-typo3'

// Set @nuxt/image screens option with values from scss breakpoints
export default defineNuxtPlugin((nuxt) => {
    const { screenWidths } = useBreakpoints()
    const screens = Object.entries(screenWidths.value).reduce(
        (result, [key, value]) => {
            // Breakpoint with 0px doesn't work with @nuxt/image so using 1px instead
            result[key] = value || 1
            return result
        },
        {} as { [key: string]: number }
    )
    nuxt.$img.options.screens = screens
})
