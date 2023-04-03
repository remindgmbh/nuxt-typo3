<template>
    <BaseT3ImageGallerySlide v-bind="attrs" />
</template>

<script setup lang="ts">
import BaseT3ImageGallerySlide from '#nuxt-typo3/components/ui/T3ImageGallery/T3ImageGallerySlide.vue'

const attrs: any = useAttrs()
</script>

<style lang="scss">
.t3-image-gallery-slide {
    &__navigation {
        height: 8rem;
    }
}
</style>
