<template>
    <iframe :src="file.publicUrl" :title="file.properties.title" />
</template>
<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{ file: Api.Asset }>()
</script>

<style lang="scss">
iframe {
    border: none;
}
</style>
