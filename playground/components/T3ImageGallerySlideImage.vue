<script lang="ts">
import T3ImageGallerySlideImage from '../../src/runtime/components/ui/T3ImageGallery/T3ImageGallerySlideImage.vue'
export default T3ImageGallerySlideImage
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
