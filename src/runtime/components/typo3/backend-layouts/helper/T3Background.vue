<template>
    <div class="background" :class="!backgroundFullWidth && containerClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useT3ContentUtil } from '#imports'

const { backgroundColorValue, backgroundFullWidth, containerClasses } =
    useT3ContentUtil()
</script>

<style lang="scss">
.background {
    background-color: v-bind('backgroundColorValue');
}
</style>
