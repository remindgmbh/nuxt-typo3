<template>
    <video
        :src="file.publicUrl"
        :autoplay="!!file.properties.autoplay"
        :preload="file.properties.lazyLoading ? 'none' : undefined"
        v-bind="assetAttrs"
    ></video>
</template>
<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    file: T3Model.Typo3.Asset
    assetAttrs?: { [key: string]: any }
}>()
</script>
