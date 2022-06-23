<template>
    <div
        class="t3-background"
        :class="[
            `t3-background--${props.appearance.backgroundColor}`,
            { container },
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api, useContentHelper } from '#nuxt-typo3'

const props = defineProps<{
    appearance: Api.Appearance
    type: string
}>()

const container = computed(
    () =>
        !useContentHelper().isFullWidth(props.type) &&
        !props.appearance.backgroundFullWidth
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-background {
    &--primary {
        background-color: $color-primary;
        color: $color-font-primary;
    }

    &--secondary {
        background-color: $color-secondary;
        color: $color-font-secondary;
    }

    &--accent {
        background-color: $color-accent;
        color: $color-font-accent;
    }

    &--white {
        background-color: $color-white;
        color: $color-font-white;
    }

    &--black {
        background-color: $color-black;
        color: $color-font-black;
    }
}
</style>
