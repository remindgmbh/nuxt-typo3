<template>
    <img :src="src" :srcset="srcset" :sizes="sizes" v-bind="attrs" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { T3Model } from '#nuxt-typo3'
import { useT3Breakpoints } from '#nuxt-typo3/composables/useT3Breakpoints'
import { useT3Config } from '#nuxt-typo3/composables/useT3Config'

const props = defineProps<{
    uid?: number
    src?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: T3Model.ImageSizes
    fileExtension?: string
}>()

const attrs = useAttrs()

const { breakpointsAsc, breakpointsDesc } = useT3Breakpoints()
const config = useT3Config()

const src = computed(() =>
    props.uid && !props.sizes
        ? getUrl(props.uid, props.maxWidth, props.maxHeight)
        : props.src
)

const sizes = computed(() => {
    if (props.sizes && props.uid) {
        const result: string[] = []
        breakpointsAsc.value.forEach((breakpoint) => {
            const size = props.sizes?.[breakpoint.name]
            if (size) {
                if (result.length === 0) {
                    result.push(size)
                }
                const minWidth = `(min-width: ${breakpoint.screenWidth}px)`
                result.unshift(`${minWidth} ${size}`)
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
            if (size && props.uid) {
                const parsedSize = Number.parseInt(size)
                const width = size.endsWith('vw')
                    ? Math.ceil(parsedSize / 100) * breakpoint.screenWidth
                    : parsedSize
                const url = getUrl(props.uid, width, undefined, breakpoint.name)
                result.push(`${url} ${width}w`)
            }
        })
        return result.join(', ')
    }
    return undefined
})

function getUrl(
    uid: number,
    maxWidth?: number,
    maxHeight?: number,
    breakpoint?: string
) {
    const url = new URL('image', config.api.baseUrl)
    url.searchParams.append('uid', uid.toString())
    url.searchParams.append(
        'fileExtension',
        props.fileExtension ?? config.imageFileExtension
    )

    if (maxWidth) {
        url.searchParams.append('maxWidth', maxWidth.toString())
    }

    if (maxHeight) {
        url.searchParams.append('maxHeight', maxHeight.toString())
    }

    if (breakpoint) {
        url.searchParams.append('breakpoint', breakpoint)
    }

    return url.toString()
}
</script>
