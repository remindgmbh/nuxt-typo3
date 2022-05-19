<template>
    <T3Link
        v-if="props.file.properties.linkData"
        :to="props.file.properties.linkData"
    >
        <img v-bind="attrs" />
    </T3Link>
    <img v-else v-bind="attrs" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { Image } from '#nuxt-typo3/api'

const props = defineProps<{ file: Image }>()

const attrs = computed(() => ({
    src: props.file.publicUrl,
    height: props.file.properties.dimensions.height,
    width: props.file.properties.dimensions.width,
    alt: props.file.properties.alternative,
    title: props.file.properties.title,
}))
</script>
