<template>
    <div class="t3-ce-text">
        <T3CeHeader :id="id" :content="content" />
        <T3HtmlParser :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { ContentText } from '#nuxt-typo3/api'

defineProps<{
    id: number
    content: ContentText
}>()
</script>
