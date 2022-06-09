<template>
    <div class="t3-ce-text">
        <T3CeHeader :id="id" :content="content" />
        <T3HtmlParser :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    id: number
    content: Api.ContentText
}>()
</script>
