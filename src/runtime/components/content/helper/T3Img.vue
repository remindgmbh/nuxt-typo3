<template>
    <picture>
        <source
            v-for="(source, index) in sources"
            :key="index"
            :media="source.media"
            :srcset="source.srcset"
        />
        <img :src="src" v-bind="attrs" />
    </picture>
</template>

<script setup lang="ts">
import {
    computed,
    T3Model,
    useAttrs,
    useT3Breakpoints,
    useT3Config,
} from '#imports'

const props = defineProps<{
    uid?: number
    src?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: T3Model.Image.Sizes
    fileExtension?: string
}>()

const attrs = useAttrs()

const { breakpointsDesc } = useT3Breakpoints()
const config = useT3Config()

const src = computed(() =>
    props.uid ? getUrl(props.uid, props.maxWidth, props.maxHeight) : props.src
)

const sources = computed(() => {
    const result: any[] = []
    if (props.uid) {
        for (let i = 0; i < breakpointsDesc.value.length; i++) {
            const breakpoint = breakpointsDesc.value[i]
            let width: number | undefined
            if (props.sizes) {
                const size = props.sizes?.[breakpoint.name]
                if (size) {
                    let containerMaxWidth = breakpoint.containerMaxWidth

                    // If max container width of current breakpoint is not a number (for example 100% for xs breakpoint)
                    // use the max container width of the next larger breakpoint
                    if (Number.isNaN(containerMaxWidth)) {
                        for (let j = i - 1; j >= 0; j--) {
                            const previousBreakpoint = breakpointsDesc.value[j]
                            if (
                                !Number.isNaN(
                                    previousBreakpoint.containerMaxWidth
                                )
                            ) {
                                containerMaxWidth =
                                    previousBreakpoint.containerMaxWidth
                                break
                            }
                        }
                    }
                    const parsedSize = Number.parseInt(size)
                    width = size.endsWith('vw')
                        ? Math.ceil(parsedSize / 100) * containerMaxWidth
                        : parsedSize
                }
            }

            result.push({
                media: `(min-width: ${breakpoint.screenWidth}px)`,
                srcset: getUrl(props.uid, width, undefined, breakpoint.name),
            })
        }
    }
    return result
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
