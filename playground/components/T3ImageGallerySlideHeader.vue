<template>
    <BaseT3ImageGallerySlideHeader v-bind="attrs" />
</template>

<script setup lang="ts">
import BaseT3ImageGallerySlideHeader from '#nuxt-typo3/components/typo3/content/helper/T3ImageGallery/T3ImageGallerySlideHeader.vue'
import { computed, useAttrs, useT3Theme } from '#imports'

const attrs: any = useAttrs()

const { themeOptions } = useT3Theme()

const colors = computed(() => themeOptions.value?.additionalData)
</script>

<style lang="scss">
.t3-image-gallery-slide-header {
    background-color: rgba(0 0 0 / 50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__header {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 1rem 0;
        align-items: center;
        width: 100%;
    }

    &__main {
        order: 1;
    }

    &__sub {
        order: 0;
        font-size: 0.875rem;
    }

    &__close-wrapper {
        display: flex;
        align-items: center;
    }

    &__close {
        background-color: transparent;
        cursor: pointer;
        border: none;
        color: v-bind('colors.white');
        font-weight: 700;
        font-size: 1.5rem;

        &::after {
            content: 'X';
        }
    }

    &__close-label {
        display: none;
    }
}
</style>
