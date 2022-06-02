<template>
    <div class="t3-ce-image">
        <T3CeHeader :id="id" :content="content" />
        <T3Asset v-if="image" :file="image" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ContentImage } from '#nuxt-typo3'

const props = defineProps<{
    id: number
    content: ContentImage
}>()

const image = computed(() => props.content.images.at(0))
</script>
