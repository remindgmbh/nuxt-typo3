<template>
    <picture>
        <source
            v-for="(source, index) in sources"
            :key="index"
            :media="source.media"
            :srcset="source.srcset"
        />
        <img
            :src="src"
            :alt="file.properties.alternative"
            :height="file.properties.dimensions.height"
            :width="file.properties.dimensions.width"
            :title="file.properties.title"
            :description="file.properties.description"
            :loading="file.properties.lazyLoading ? 'lazy' : undefined"
        />
    </picture>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3Breakpoints, useT3Asset } from '#imports'

const props = defineProps<{
    file: T3Model.Typo3.Asset
    fileExtension?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: number }
}>()

const { breakpointsDesc, screenWidths } = useT3Breakpoints()
const { getImageUrl } = useT3Asset(props.file)

const src = computed(() =>
    props.file.properties.fileReferenceUid
        ? getImageUrl(props.fileExtension, props.maxWidth, props.maxHeight)
        : props.file.publicUrl
)

const sources = computed(() => {
    const result: any[] = []
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
                    breakpoint
                ),
            })
        }
    }
    return result
})
</script>
