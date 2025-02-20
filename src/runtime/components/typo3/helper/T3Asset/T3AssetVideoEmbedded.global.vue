<template>
    <iframe
        :loading="file.lazyLoading ? 'lazy' : undefined"
        :src="file.url"
        :title="file.title"
    ></iframe>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    file: T3Model.Typo3.Asset.Video
}

defineProps<Props>()
</script>

<style lang="scss">
iframe {
    border: none;
}
</style>
