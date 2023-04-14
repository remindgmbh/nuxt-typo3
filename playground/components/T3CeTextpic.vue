<template>
    <BaseT3CeTextpic
        :content-element="contentElement"
        :asset-attrs="{ sizes: imageSizes }"
    />
</template>

<script setup lang="ts">
import BaseT3CeTextpic from '#nuxt-typo3/components/content/elements/T3CeTextpic.vue'
import { computed, T3Model, useT3Breakpoints, useT3TextAsset } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Textpic>
}>()

const { breakpoints } = useT3Breakpoints()

const { assetIsSmall } = useT3TextAsset(props.contentElement.content)

const imageSizes = computed<T3Model.Image.Sizes>(() => {
    if (assetIsSmall) {
        return {
            xs: '100vw',
            sm: `${breakpoints.value.sm.containerMaxWidth}px`,
            md: `${Math.ceil(breakpoints.value.md.containerMaxWidth / 3)}px`,
            lg: `${Math.ceil(breakpoints.value.lg.containerMaxWidth / 3)}px`,
            xl: `${Math.ceil(breakpoints.value.xl.containerMaxWidth / 3)}px`,
        }
    } else {
        return {
            xs: '100vw',
            sm: `${breakpoints.value.sm.containerMaxWidth}px`,
            md: `${breakpoints.value.md.containerMaxWidth}px`,
            lg: `${Math.ceil(breakpoints.value.lg.containerMaxWidth / 2)}px`,
            xl: `${Math.ceil(breakpoints.value.xl.containerMaxWidth / 2)}px`,
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
