<template>
    <video
        :src="file.publicUrl"
        :autoplay="!!file.properties.autoplay"
        controls
    ></video>
</template>
<script setup lang="ts">
import { Asset } from '#nuxt-typo3'

defineProps<{ file: Asset }>()
</script>
