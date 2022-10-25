<script lang="ts">
export { default } from '#nuxt-typo3/components/ui/T3ImageGallery/T3ImageGallerySlideNavigation.vue'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

.t3-image-gallery-slide-navigation {
    padding: 1rem;
    background-color: rgba(0 0 0 / 50%);

    &__scrollbar {
        bottom: 0.5rem;
        left: 1rem;
        width: calc(100% - 2rem);
    }

    &__image {
        transition: opacity 0.5s;
        opacity: 0.6;
        position: relative;

        &:hover {
            opacity: 0.8;
        }

        &--active {
            &,
            &:hover {
                opacity: 1;
            }
        }
    }

    &__slide {
        overflow: hidden;
        background-color: $color-black;

        &:not(&:last-child) {
            margin-right: 1rem;
        }
    }
}
</style>
