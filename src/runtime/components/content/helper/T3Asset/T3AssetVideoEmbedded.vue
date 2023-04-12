<template>
    <iframe
        :src="file.publicUrl"
        :title="file.properties.title"
        :loading="file.properties.lazyLoading ? 'lazy' : undefined"
    />
</template>
<script setup lang="ts">
import { T3Api } from '#imports'

defineProps<{ file: T3Api.Asset }>()
</script>

<style lang="scss">
iframe {
    border: none;
}
</style>
