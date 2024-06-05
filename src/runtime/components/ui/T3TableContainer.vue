<template>
    <slot></slot>
</template>

<script setup lang="ts"></script>

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
        transition: width 0;
        z-index: $viewport-z-index + 1;
        pointer-events: none;

        // &--visible {
        //     // define width, for example:
        //     width: 2rem;
        // }

        &--left {
            left: 0;

            // define background, for example:
            // background: linear-gradient(
            //     to left,
            //     rgb(255 255 255 / 0%) 0%,
            //     white 100%
            // );
        }

        &--right {
            right: 0;

            // define background, for example:
            // background: linear-gradient(
            //     to right,
            //     rgb(255 255 255 / 0%) 0%,
            //     white 100%
            // );
        }
    }
}
</style>
