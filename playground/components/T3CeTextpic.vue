<template>
    <BaseT3CeTextpic
        :content-element="contentElement"
        :asset-attrs="{ sizes: imageSizes }"
    />
</template>

<script setup lang="ts">
import { T3Api, T3Model } from '#nuxt-typo3'
import BaseT3CeTextpic from '#nuxt-typo3/components/content/elements/T3CeTextpic.vue'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textpic>
}>()

const { breakpoints } = useT3Breakpoints()

const { textmediaContentElement } = useT3CeTextpic(props.contentElement)

const { assetIsSmall } = useT3TextAsset(textmediaContentElement.value.content)

const imageSizes = computed<T3Model.ImageSizes>(() => {
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
