<template>
    <div
        class="t3-frame container"
        :class="{
            [`t3-frame--space-before-${props.appearance.spaceBefore}`]:
                props.appearance.spaceBefore,
            [`t3-frame--space-before-inside-${props.appearance.spaceBeforeInside}`]:
                props.appearance.spaceBeforeInside &&
                props.appearance.backgroundColor,
            [`t3-frame--space-after-${props.appearance.spaceAfter}`]:
                props.appearance.spaceAfter,
            [`t3-frame--space-after-inside-${props.appearance.spaceAfterInside}`]:
                props.appearance.spaceAfterInside &&
                props.appearance.backgroundColor,
        }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Appearance } from '../api'

const props = defineProps<{
    appearance: Appearance
}>()
</script>

<style lang="scss">
@use '../assets/styles/variables' as *;

.t3-frame {
    box-sizing: border-box;

    @each $name, $value in $frame-spaces {
        &--space-before-#{$name} {
            margin-top: $value;
        }
        &--space-after-#{$name} {
            margin-bottom: $value;
        }
        &--space-before-inside-#{$name} {
            padding-top: $value;
        }
        &--space-after-inside-#{$name} {
            padding-bottom: $value;
        }
    }
}
</style>
