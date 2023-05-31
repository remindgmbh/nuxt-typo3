<template>
    <BaseT3ImageGalleryScroll v-bind="attrs" />
</template>

<script setup lang="ts">
import BaseT3ImageGalleryScroll from '#nuxt-typo3/components/ui/T3ImageGallery/T3ImageGalleryScroll.vue'
import { computed, useAttrs, useT3Theme } from '#imports'

const attrs: any = useAttrs()

const { themeOptions } = useT3Theme()

const colors = computed(() => themeOptions.value?.additionalData)
</script>

<style lang="scss">
.t3-image-gallery-scroll {
    $divider-margin: 2rem;

    padding: 2rem 0;
    box-sizing: border-box;

    &__close-wrapper {
        display: flex;
        justify-content: flex-end;
    }

    &__close-label {
        display: none;
    }

    &__close {
        background-color: transparent;
        color: v-bind('colors.white');
        border: none;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;

        &::after {
            content: 'X';
        }
    }

    &__item {
        gap: 2rem;
        scroll-margin-top: $divider-margin;
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 600;
    }

    &__divider {
        margin: $divider-margin 0;
        height: 0.125rem;
        background-color: v-bind('colors.white');
    }
}
</style>
