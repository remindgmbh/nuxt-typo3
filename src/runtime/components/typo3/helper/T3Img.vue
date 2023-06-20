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
import { computed } from 'vue'
import { T3Model, useAttrs, useT3Breakpoints, useT3Config } from '#imports'

const props = defineProps<{
    uid?: number
    src?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: T3Model.Image.Sizes
    fileExtension?: string
}>()

const attrs = useAttrs()

const { breakpointsDesc, screenWidths } = useT3Breakpoints()
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
                width = props.sizes?.[breakpoint]
            }

            result.push({
                media: `(min-width: ${screenWidths[breakpoint]})`,
                srcset: getUrl(props.uid, width, undefined, breakpoint),
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
