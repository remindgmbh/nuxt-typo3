<template>
    <t3-scroll-indicator top right bottom left class="scroll-indicator-example">
        <template #top="{ visible }">
            <div
                class="scroll-indicator-example__top"
                :class="{ 'scroll-indicator-example__top--visible': visible }"
            ></div>
        </template>
        <template #right="{ visible }">
            <div
                class="scroll-indicator-example__right"
                :class="{
                    'scroll-indicator-example__right--visible': visible,
                }"
            ></div>
        </template>
        <template #bottom="{ visible }">
            <div
                class="scroll-indicator-example__bottom"
                :class="{
                    'scroll-indicator-example__bottom--visible': visible,
                }"
            ></div>
        </template>
        <template #left="{ visible }">
            <div
                class="scroll-indicator-example__left"
                :class="{
                    'scroll-indicator-example__left--visible': visible,
                }"
            ></div>
        </template>
        <div ref="content" class="scroll-indicator-example__content"></div>
    </t3-scroll-indicator>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ScrollIndicatorComponentExample extends Vue {}
</script>
<style lang="scss">
.scroll-indicator-example {
    height: 32rem;
    max-width: 32rem;

    &__top,
    &__right,
    &__bottom,
    &__left {
        position: absolute;
        background-color: red;

        &--visible {
            background-color: green;
        }
    }

    &__top,
    &__bottom {
        left: calc(50% - 2rem);
        width: 4rem;
        height: 1rem;
    }

    &__right,
    &__left {
        top: calc(50% - 2rem);
        width: 1rem;
        height: 4rem;
    }

    &__top {
        top: 8rem;
    }

    &__right {
        right: 8rem;
    }

    &__bottom {
        bottom: 8rem;
    }

    &__left {
        left: 8rem;
    }

    &__content {
        background-color: grey;
        height: 48rem;
        width: 48rem;
    }
}
</style>
