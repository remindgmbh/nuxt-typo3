<template>
    <pre>{{ contentElement }}</pre>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
