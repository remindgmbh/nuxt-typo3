<template>
    <div class="t3-ce-text">
        <T3CeHeader :id="id" :content="content" />
        <T3HtmlParser :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { Content } from '#nuxt-typo3/api'

defineProps<{
    id: number
    content: Content & { bodytext: string }
}>()
</script>
