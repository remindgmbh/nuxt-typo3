<template>
    <img v-bind="attrs" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

const props = defineProps<{ file: Api.Asset }>()

const attrs = computed(() => ({
    src: props.file.publicUrl,
    height: props.file.properties.dimensions.height,
    width: props.file.properties.dimensions.width,
    alt: props.file.properties.alternative,
    title: props.file.properties.title,
}))
</script>
