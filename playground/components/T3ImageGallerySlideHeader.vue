<script lang="ts">
export { T3ImageGallerySlideHeader as default } from '#nuxt-typo3'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

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
        color: $color-white;
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
