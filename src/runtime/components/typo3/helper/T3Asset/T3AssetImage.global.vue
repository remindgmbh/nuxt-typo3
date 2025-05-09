<template>
    <picture>
        <source
            v-for="(source, index) in sources"
            :key="index"
            :media="source.media"
            :srcset="source.srcset"
        />
        <img
            :alt="file.alternative"
            :description="file.description"
            :height="file.dimensions.height"
            :loading="file.lazyLoading ? 'lazy' : undefined"
            :src="src"
            :title="file.title"
            :width="file.dimensions.width"
        />
    </picture>
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset, useT3Breakpoints } from '#imports'
import { computed, toRef } from 'vue'

export interface Props {
    crop?: string
    file: T3Model.Typo3.Asset.Image
    fileExtension?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: number }
}

const props = defineProps<Props>()

const pixelDensities = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3]

const { breakpointsDesc, screenWidths } = useT3Breakpoints()
const { getAssetUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.fileReferenceUid
        ? getAssetUrl(
              props.fileExtension,
              props.maxWidth,
              props.maxHeight,
              undefined,
              props.crop,
          )
        : props.file.url,
)

const sources = computed(() => {
    const result: Array<{ media: string; srcset: string }> = []
    if (props.file.fileReferenceUid) {
        for (let i = 0; i < breakpointsDesc.value.length; i++) {
            const breakpoint = breakpointsDesc.value[i]
            let width: number | undefined
            if (props.sizes) {
                width = props.sizes?.[breakpoint]

                // if no width for breakpoint is defined try smaller breakpoints
                if (!width) {
                    const smallerBreakpoints = breakpointsDesc.value.slice(
                        i + 1,
                    )
                    for (let j = 0; j < smallerBreakpoints.length; j++) {
                        width = props.sizes?.[smallerBreakpoints[j]]
                        if (width) {
                            break
                        }
                    }
                }
            }

            const srcset = pixelDensities
                .map((pixelDensity) => {
                    const url = getAssetUrl(
                        props.fileExtension,
                        width ? Math.ceil(width * pixelDensity) : undefined,
                        undefined,
                        breakpoint,
                        props.crop,
                    )
                    return `${url} ${pixelDensity}x`
                })
                .join(', ')

            result.push({
                media: `(min-width: ${screenWidths[breakpoint]})`,
                srcset,
            })
        }
    }
    return result
})
</script>
