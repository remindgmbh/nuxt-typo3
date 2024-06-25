<template>
    <div class="t3-form-static-text">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps<{
    text?: string
}>()
</script>
