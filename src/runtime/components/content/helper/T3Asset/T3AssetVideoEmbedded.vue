<template>
    <iframe
        :src="file.publicUrl"
        :title="file.properties.title"
        :loading="file.properties.lazyLoading ? 'lazy' : undefined"
    />
</template>
<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{ file: T3Model.Typo3.Asset }>()
</script>

<style lang="scss">
iframe {
    border: none;
}
</style>
