<script lang="ts">
export { T3ImageGallery as default } from '#nuxt-typo3'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

.t3-image-gallery {
    &__navigation {
        padding: 1rem;
        background-color: white;

        &--disabled {
            color: lightgrey;
        }
    }

    &__scrollbar {
        bottom: 0.5rem;
        left: 1rem;
        width: calc(100% - 2rem);
    }

    &__slide {
        overflow: hidden;

        img {
            transition: transform 0.5s;
        }

        &:hover {
            img {
                transform: scale(1.25);
            }
        }

        &:not(&:last-child) {
            margin-right: 0.5rem;
        }
    }
}
</style>
