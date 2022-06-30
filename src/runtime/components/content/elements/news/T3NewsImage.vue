<template>
    <img
        class="t3-news-image"
        :src="image.publicUrl"
        :alt="properties.alternative"
        :title="properties.title"
    />
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    image: Api.Content.News.Image
    properties: Api.Content.News.MediaProperties
}>()
</script>
