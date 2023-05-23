<template>
    <BaseT3ImageGallery v-bind="attrs" />
</template>

<script setup lang="ts">
import BaseT3ImageGallery from '#nuxt-typo3/components/ui/T3ImageGallery/T3ImageGallery.vue'
import { computed, useAttrs, useT3Theme } from '#imports'

const attrs: any = useAttrs()

const { themeOptions } = useT3Theme()

const colors = computed(() => themeOptions.value.general)
</script>
<style lang="scss">
.t3-image-gallery {
    height: 12rem;

    &__navigation {
        padding: 1rem;
        background-color: v-bind('colors.white');

        &--disabled {
            color: lightgrey;
        }
    }

    &__scrollbar {
        bottom: 0.5rem;
        left: 1rem;
        width: calc(100% - 2rem);
        background-color: v-bind('colors.black');
        height: 0.25rem;
    }

    &__scrollbar-drag {
        background-color: v-bind('colors.primary');
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

    &__modal {
        color: v-bind('colors.white');

        & .t3-modal {
            &__background {
                background-color: rgba(0 0 0 / 95%);
            }
        }
    }
}
</style>
