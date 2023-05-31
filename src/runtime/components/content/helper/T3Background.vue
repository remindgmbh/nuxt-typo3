<template>
    <div
        class="t3-background"
        :class="!backgroundFullWidth && containerClasses"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3ContentUtil } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const { backgroundColor, backgroundFullWidth, containerClasses } =
    useT3ContentUtil(props.contentElement)
</script>

<style lang="scss">
.t3-background {
    background-color: v-bind('backgroundColor');
}
</style>
