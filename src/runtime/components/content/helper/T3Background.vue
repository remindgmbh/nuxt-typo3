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
import { T3Api } from '#nuxt-typo3'
import { useT3ContentUtil } from '#nuxt-typo3/composables/useT3ContentUtil'

const props = defineProps<{
    contentElement: T3Api.ContentElement
}>()

const { color, isFullWidth } = useT3ContentUtil(props.contentElement)

const container = computed(
    () =>
        !isFullWidth.value &&
        !props.contentElement.appearance.backgroundFullWidth
)
</script>

<style lang="scss">
.t3-background {
    background-color: v-bind('color.value');
    color: v-bind('color.contrast');
}
</style>
