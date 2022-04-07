<template>
    <div class="t3-ce-text">
        <T3CeHeader :id="id" :content="props.content" />
        <T3HtmlParser :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { Content } from 'src/api'

const props = defineProps<{
    id: number
    content: Content & { bodytext: string }
}>()
</script>
