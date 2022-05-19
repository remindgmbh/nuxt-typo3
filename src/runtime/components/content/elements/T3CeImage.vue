<template>
    <div class="t3-ce-image">
        <T3CeHeader :id="id" :content="content" />
        <T3Image v-if="image" :file="image" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Content, Image } from '#nuxt-typo3/api'

const props = defineProps<{
    id: number
    content: Content & { images: Image[] }
}>()

const image = computed(() => props.content.images.at(0))
</script>
