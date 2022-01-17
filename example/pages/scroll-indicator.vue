<template>
    <div class="scroll-indicator-example">
        <div
            class="scroll-indicator-example__top"
            :class="{ 'scroll-indicator-example__top--visible': top }"
        ></div>
        <div
            class="scroll-indicator-example__right"
            :class="{ 'scroll-indicator-example__right--visible': right }"
        ></div>
        <div
            class="scroll-indicator-example__bottom"
            :class="{ 'scroll-indicator-example__bottom--visible': bottom }"
        ></div>
        <div
            class="scroll-indicator-example__left"
            :class="{ 'scroll-indicator-example__left--visible': left }"
        ></div>
        <div ref="viewport" class="scroll-indicator-example__viewport">
            <div ref="content" class="scroll-indicator-example__content"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ScrollIndicator } from '../../src/util/scroll-indicator'

@Component
export default class ScrollIndicatorExample extends Vue {
    top = true
    right = false
    bottom = false
    left = true

    mounted(): void {
        new ScrollIndicator({
            content: this.$refs.content as Element,
            viewport: this.$refs.viewport as Element,
            direction: 'top',
        }).watch((detached) => {
            this.top = !detached
        })
        new ScrollIndicator({
            content: this.$refs.content as Element,
            viewport: this.$refs.viewport as Element,
            // right-fixed because content has fixed width so there are no subpixels
            direction: 'right-fixed',
        }).watch((detached) => {
            this.right = !detached
        })
        new ScrollIndicator({
            content: this.$refs.content as Element,
            viewport: this.$refs.viewport as Element,
            direction: 'bottom',
        }).watch((detached) => {
            this.bottom = !detached
        })
        new ScrollIndicator({
            content: this.$refs.content as Element,
            viewport: this.$refs.viewport as Element,
            direction: 'left',
        }).watch((detached) => {
            this.left = !detached
        })
    }
}
</script>
<style lang="scss">
.scroll-indicator-example {
    position: relative;
    height: 32rem;
    width: 32rem;

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

    &__viewport {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    &__content {
        background-color: grey;
        height: 64rem;
        width: 64rem;
    }
}
</style>
