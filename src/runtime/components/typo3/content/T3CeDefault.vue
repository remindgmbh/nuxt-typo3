<template>
    <pre>{{ contentElement }}</pre>
</template>

<script setup lang="ts">
import { useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement()
</script>

<style lang="scss">
pre {
    white-space: pre-wrap;
}
</style>
