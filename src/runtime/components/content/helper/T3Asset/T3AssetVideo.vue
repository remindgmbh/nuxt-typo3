<template>
    <video
        :src="file.publicUrl"
        :autoplay="!!file.properties.autoplay"
        controls
    ></video>
</template>
<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{ file: Api.Asset }>()
</script>
