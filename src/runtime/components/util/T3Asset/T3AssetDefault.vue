<template>
    <pre>{{ file }}</pre>
</template>
<script setup lang="ts">
import { Asset } from '#nuxt-typo3'

defineProps<{ file: Asset }>()
</script>
