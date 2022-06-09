<template>
    <pre>{{ props }}</pre>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    id: number
    content: Api.Content
    type: string
}>()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
