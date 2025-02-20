<template>
    <slot v-for="name in order" :key="name" :name="name"></slot>
</template>

<script setup lang="ts">
export interface Props {
    order: string[]
}

defineProps<Props>()
</script>
