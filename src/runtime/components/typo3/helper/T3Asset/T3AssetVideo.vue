<template>
    <video
        :src="file.publicUrl"
        :autoplay="!!file.properties.autoplay"
        :preload="file.properties.lazyLoading ? 'none' : undefined"
        :loop="loop"
        :muted="muted"
        :controls="controls"
    ></video>
</template>
<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    file: T3Model.Typo3.Asset
    loop?: boolean
    muted?: boolean
    controls?: boolean
}>()
</script>
