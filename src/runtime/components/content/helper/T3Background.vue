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
import { Appearance } from '#nuxt-typo3/api'
import { isFullWidth } from '#nuxt-typo3/composables/useContentHelper'

const props = defineProps<{
    appearance: Appearance
    type: string
}>()

const container = computed(
    () => !isFullWidth(props.type) && !props.appearance.backgroundFullWidth
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

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
