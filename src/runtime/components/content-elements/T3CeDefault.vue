<template>
    <pre>{{ props }}</pre>
</template>

<script setup lang="ts">
import { Content } from 'src/api'

const props = defineProps<{
    id: number
    content: Content
}>()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
