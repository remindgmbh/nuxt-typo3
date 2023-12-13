<template>
    <pre>{{ contentElement }}</pre>
</template>

<script setup lang="ts">
import { useT3ContentInjection } from '#imports'

const { injectContentElement } = useT3ContentInjection()

const contentElement = injectContentElement()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
