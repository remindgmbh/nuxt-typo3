<template>
    <slot v-if="!props.appearance.backgroundColor" />
    <div
        v-else
        class="t3-background"
        :class="[
            `t3-background--${props.appearance.backgroundColor}`,
            { container: !props.appearance.backgroundFullWidth },
        ]"
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

.t3-background {
    &--primary {
        background-color: $color-primary;
    }

    &--secondary {
        background-color: $color-secondary;
    }

    &--accent {
        background-color: $color-accent;
    }

    &--white {
        background-color: $color-white;
    }

    &--black {
        background-color: $color-black;
    }
}
</style>
