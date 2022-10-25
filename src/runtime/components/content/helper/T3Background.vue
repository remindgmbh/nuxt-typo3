<template>
    <div
        class="t3-background"
        :class="[
            `t3-background--${props.contentElement.appearance.backgroundColor}`,
            { container },
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Api, useT3ContentUtil } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: T3Api.ContentElement
}>()

const { isFullWidth } = useT3ContentUtil(props.contentElement)

const container = computed(
    () =>
        !isFullWidth.value &&
        !props.contentElement.appearance.backgroundFullWidth
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
