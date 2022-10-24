<template>
    <video
        :src="file.publicUrl"
        :autoplay="!!file.properties.autoplay"
        controls
    ></video>
</template>
<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{ file: T3Api.Asset }>()
</script>
