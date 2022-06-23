<template>
    <pre>{{ contentElement }}</pre>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement
}>()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
