<template>
    <img :src="src" :srcset="srcset" :sizes="sizes" v-bind="attrs" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useBreakpoints, useConfig } from '#nuxt-typo3'

const props = defineProps<{
    uid?: number
    src?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: string }
}>()

const attrs = useAttrs()

const { breakpointsDesc } = useBreakpoints()
const config = useConfig()

const src = computed(() =>
    props.uid && !props.sizes
        ? getUrl(props.uid, props.maxWidth, props.maxHeight)
        : props.src
)

const sizes = computed(() => {
    if (props.sizes && props.uid) {
        const result: string[] = []
        breakpointsDesc.value.forEach((breakpoint) => {
            const size = props.sizes?.[breakpoint.name]
            if (size && breakpoint.screenWidth) {
                const minWidth = breakpoint.screenWidth
                    ? `(min-width: ${breakpoint.screenWidth}px) `
                    : ''
                result.push(`${minWidth}${size}`)
            }
        })
        return result.join(', ')
    }
    return undefined
})

const srcset = computed(() => {
    if (props.sizes && props.uid) {
        const result: string[] = []
        breakpointsDesc.value.forEach((breakpoint) => {
            const size = props.sizes?.[breakpoint.name]
            if (size && breakpoint.screenWidth && props.uid) {
                const parsedSize = Number.parseInt(size)
                const width = size.endsWith('vw')
                    ? Math.ceil(parsedSize / 100) * breakpoint.screenWidth
                    : parsedSize
                const url = getUrl(props.uid, width)
                result.push(`${url} ${width}w`)
            }
        })
        return result.join(', ')
    }
    return undefined
})

function getUrl(uid: number, maxWidth?: number, maxHeight?: number) {
    const url = new URL('image', config.api.baseUrl)
    url.searchParams.append('uid', uid.toString())

    if (maxWidth) {
        url.searchParams.append('maxWidth', maxWidth.toString())
    }

    if (maxHeight) {
        url.searchParams.append('maxHeight', maxHeight.toString())
    }

    return url.toString()
}
</script>
