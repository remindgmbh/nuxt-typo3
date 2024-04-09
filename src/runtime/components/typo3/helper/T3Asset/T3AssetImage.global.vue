<template>
    <picture>
        <source
            v-for="(source, index) in sources"
            :key="index"
            :media="source.media"
            :srcset="source.srcset"
        />
        <img
            :alt="file.properties.alternative"
            :description="file.properties.description"
            :height="file.properties.dimensions.height"
            :loading="file.properties.lazyLoading ? 'lazy' : undefined"
            :src="src"
            :title="file.properties.title"
            :width="file.properties.dimensions.width"
        />
    </picture>
</template>

<script setup lang="ts">
import { T3Model, useT3Asset, useT3Breakpoints } from '#imports'
import { computed, toRef } from 'vue'

const props = defineProps<{
    file: T3Model.Typo3.Asset
    fileExtension?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: number }
}>()

const { breakpointsDesc, screenWidths } = useT3Breakpoints()
const { getImageUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.properties.fileReferenceUid
        ? getImageUrl(props.fileExtension, props.maxWidth, props.maxHeight)
        : props.file.publicUrl,
)

const sources = computed(() => {
    const result: Array<{ media: string; srcset: string }> = []
    if (props.file.properties.fileReferenceUid) {
        for (let i = 0; i < breakpointsDesc.value.length; i++) {
            const breakpoint = breakpointsDesc.value[i]
            let width: number | undefined
            if (props.sizes) {
                width = props.sizes?.[breakpoint]
            }

            result.push({
                media: `(min-width: ${screenWidths[breakpoint]})`,
                srcset: getImageUrl(
                    props.fileExtension,
                    width,
                    undefined,
                    breakpoint,
                ),
            })
        }
    }
    return result
})
</script>
