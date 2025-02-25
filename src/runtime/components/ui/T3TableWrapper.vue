<template>
    <slot></slot>
</template>

<script setup lang="ts">
export interface Props {
    overlayColor?: string
}

export interface Slots {
    default(): any
}

defineProps<Props>()
defineSlots<Slots>()
</script>

<style lang="scss">
.t3-table {
    $viewport-z-index: 0;

    position: relative;

    &__viewport {
        overflow-x: auto;
        position: relative;
        z-index: $viewport-z-index;
    }

    &__overlay {
        content: '';
        top: 0;
        position: absolute;
        width: 0;
        height: 100%;
        transition: width 0s;
        z-index: $viewport-z-index + 1;
        pointer-events: none;

        &--visible {
            width: 0;
        }

        &--left {
            left: 0;
            background: linear-gradient(
                to left,
                rgb(255 255 255 / 0%) 0%,
                v-bind('overlayColor') 100%
            );
        }

        &--right {
            right: 0;
            background: linear-gradient(
                to right,
                rgb(255 255 255 / 0%) 0%,
                v-bind('overlayColor') 100%
            );
        }
    }
}
</style>
