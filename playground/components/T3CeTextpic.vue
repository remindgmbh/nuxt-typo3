<template>
    <BaseT3CeTextpic
        :content-element="contentElement"
        :asset-attrs="{ sizes: imageSizes }"
    />
</template>

<script setup lang="ts">
import BaseT3CeTextpic from '#nuxt-typo3/components/typo3/content/T3CeTextpic.vue'
import { computed, T3Model, useT3Breakpoints, useT3TextAsset } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Textpic>
}>()

const { containerWidthsInPx } = useT3Breakpoints()

const { assetIsSmall } = useT3TextAsset(props.contentElement.content)

const imageSizes = computed<T3Model.Image.Sizes>(() => {
    if (assetIsSmall) {
        return {
            xs: containerWidthsInPx.value.sm,
            sm: Math.ceil(containerWidthsInPx.value.sm / 2),
            md: Math.ceil(containerWidthsInPx.value.md / 3),
            lg: Math.ceil(containerWidthsInPx.value.lg / 3),
            xl: Math.ceil(containerWidthsInPx.value.xl / 3),
        }
    } else {
        return {
            xs: containerWidthsInPx.value.sm,
            sm: containerWidthsInPx.value.sm,
            md: containerWidthsInPx.value.md,
            lg: Math.ceil(containerWidthsInPx.value.lg / 2),
            xl: Math.ceil(containerWidthsInPx.value.xl / 2),
        }
    }
})
</script>

<style lang="scss">
@use '@/assets/breakpoints.scss';

.t3-ce-textpic {
    .t3-text-asset {
        @include breakpoints.up(sm) {
            gap: 1rem;
            flex-wrap: nowrap;

            &__asset {
                &--large {
                    width: 50%;
                }
            }

            &__text {
                &--small {
                    width: 50%;
                }
            }
        }

        @include breakpoints.up(md) {
            &__asset {
                &--small {
                    width: calc(1 / 3 * 100%);
                }
            }

            &__text {
                &--large {
                    width: calc(2 / 3 * 100%);
                }
            }
        }
    }
}
</style>
