<template>
    <pre>{{ contentElement }}</pre>
</template>

<script setup lang="ts">
import { T3Api } from '#imports'

defineProps<{
    contentElement: T3Api.ContentElement
}>()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
