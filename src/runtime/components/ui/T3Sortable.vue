<template>
    <slot v-for="name in order" :key="name" :name="name"></slot>
</template>

<script setup lang="ts">
defineProps<{
    order: string[]
}>()
</script>
