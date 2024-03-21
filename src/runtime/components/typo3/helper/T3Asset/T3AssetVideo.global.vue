<template>
    <video
        :autoplay="!!file.properties.autoplay"
        :controls="controls"
        :loop="loop"
        :muted="muted"
        :preload="file.properties.lazyLoading ? 'none' : undefined"
        :src="file.publicUrl"
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
