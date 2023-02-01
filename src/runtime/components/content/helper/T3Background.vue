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
@use '#nuxt-typo3/assets/styles/colors' as colors;

.t3-background {
    &--primary {
        background-color: colors.$primary;
        color: colors.$font-primary;
    }

    &--secondary {
        background-color: colors.$secondary;
        color: colors.$font-secondary;
    }

    &--accent {
        background-color: colors.$accent;
        color: colors.$font-accent;
    }

    &--white {
        background-color: colors.$white;
        color: colors.$font-white;
    }

    &--black {
        background-color: colors.$black;
        color: colors.$font-black;
    }
}
</style>
