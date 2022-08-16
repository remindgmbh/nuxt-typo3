<script lang="ts">
export { T3ImageGallerySlideImage as default } from '#nuxt-typo3'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

.t3-image-gallery-slide-image {
    &__image {
        max-width: calc(100% - 4rem);
        max-height: calc(100% - 2rem);
    }
}
</style>
