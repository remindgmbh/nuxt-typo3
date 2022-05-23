<template>
    <iframe :src="file.publicUrl" :title="file.properties.title" />
</template>
<script setup lang="ts">
import { Asset } from '#nuxt-typo3/api'

defineProps<{ file: Asset }>()
</script>

<style lang="scss">
iframe {
    border: none;
}
</style>
