<template>
    <div
        class="t3-background"
        :class="!backgroundFullWidth && containerClasses"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useT3Content } from '#imports'

export interface Slots {
    default(): any
}

defineSlots<Slots>()

const { backgroundColorValue, backgroundFullWidth, containerClasses } =
    useT3Content()
</script>

<style lang="scss">
.t3-background {
    background-color: v-bind('backgroundColorValue');
}
</style>
