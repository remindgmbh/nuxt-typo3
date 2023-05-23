<template>
    <div class="t3-background" :class="{ container }">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3ContentUtil } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const { backgroundColor, isFullWidth } = useT3ContentUtil(props.contentElement)

const container = computed(
    () =>
        !isFullWidth.value &&
        !props.contentElement.appearance.backgroundFullWidth
)
</script>

<style lang="scss">
.t3-background {
    background-color: v-bind('backgroundColor');
}
</style>
