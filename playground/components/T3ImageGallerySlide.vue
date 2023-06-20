<template>
    <BaseT3ImageGallerySlide v-bind="attrs" />
</template>

<script setup lang="ts">
import BaseT3ImageGallerySlide from '#nuxt-typo3/components/typo3/content/helper/T3ImageGallery/T3ImageGallerySlide.vue'
import { useAttrs } from '#imports'

const attrs: any = useAttrs()
</script>

<style lang="scss">
.t3-image-gallery-slide {
    &__navigation {
        height: 8rem;
    }
}
</style>
